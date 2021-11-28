import React from 'react';
import classNames from 'classnames';
import './styles.scss';

const CELSIUS_D = -273.15;
const weatherIconMap = {
  'clouds': 'fa-cloud',
  'mist': 'fa-align-justify',
  'fog': 'fa-align-justify',
  'clear': 'fa-sun-o',
  'snow': 'fa-snowflake-o',
  'rain': 'fa-tint',
}

const WeatherAndTemp = ({weather, temp}) => {
  const iconClass = weather && weatherIconMap[weather.toLowerCase()];
  const celsius = typeof(temp) === 'number'
    ? `${temp + CELSIUS_D > 0 ? '+' : ''}${(temp + CELSIUS_D).toFixed(1)}`
    : '-';

  return (
    <div className="weather-and-temp">
      {iconClass
        ? <i className={classNames('fa', 'fa-fw', iconClass)} title={weather} />
        : <span>{weather || '-'}</span>
      }
      <span>/</span>
      <span>{celsius}</span>
    </div>
  );
}

export default WeatherAndTemp;
