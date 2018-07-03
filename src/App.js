import React, { Component } from "react";

// components
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

var weather = require("openweather-apis");
const keys = require("./config.js");

const GOOGLE_GEOCODING_API_KEY = keys.GOOGLE_GEOCODING_API_KEY;
const WEATHER_API_KEY = keys.WEATHER_API_KEY;

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    state: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();

    // get input
    const city = e.target.elements.city.value;
    const state = e.target.elements.state.value;
    if (city && state) {
      // get location data (lon, lat)
      const googleGeocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}+${state}&key=${GOOGLE_GEOCODING_API_KEY}`;
      const google_api_call = await fetch(googleGeocodingURL);
      const google_data = await google_api_call.json();

      // set weather object
      weather.setAPPID(WEATHER_API_KEY);
      weather.setLang("en");
      weather.setCoordinate(
        google_data.results[0].geometry.location.lat,
        google_data.results[0].geometry.location.lng
      );
      weather.setUnits("imperial");

      // get weather
      var self = this;
      weather.getAllWeather(function(err, data) {
        console.log(data);
        self.setState({
          temperature: data.main.temp,
          city: data.name,
          state: google_data.results[0].address_components[2].short_name,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      });
    }
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className=".col-xs-5 title-container">
                  <Titles />
                </div>
                <div className=".col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    state={this.state.state}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
