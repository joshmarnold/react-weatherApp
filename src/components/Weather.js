import React from "react";

const Weather = props => (
  <div className="weather__info">
    {props.city &&
      props.state && (
        <p className="weather__key">
          Location:&nbsp;
          <span className="weather__value">
            {props.city}, {props.state}
          </span>
        </p>
      )}
    {props.temperature && (
      <p className="weather__key">
        Temperature:
        <span className="weather__value"> {props.temperature}</span>
      </p>
    )}
    {props.humidity && (
      <p className="weather__key">
        Humidity:
        <span className="weather__value"> {props.humidity}</span>
      </p>
    )}
    {props.description && (
      <p className="weather__key">
        Conditions:
        <span className="weather__value"> {props.description}</span>
      </p>
    )}
  </div>
);

export default Weather;