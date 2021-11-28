import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { fetchMyWeather } from '../../slices/weather';
import WeatherAndTemp from './../WeatherAndTemp';
import Timezone from '../Timezone';
import './styles.scss';

const App = () => {
  const dispatch = useDispatch();
  const myWeather = useSelector((state) => state.cities.my);
  const isPending = useSelector((state) => state.weather.pendings.my);

  useEffect(() => fetchWeather(), []);

  const fetchWeather = () => dispatch(fetchMyWeather());

  return (
    <div className="header">
      <span>Weather App</span>
      <div className="my-weather">
        { myWeather?.name
            ? <>
                <div className={classNames({'error': myWeather.hasError})}>{myWeather.name}</div>
                <div>
                  <Timezone offsetInSeconds={myWeather.timezone} />
                </div>
                <div>
                  <WeatherAndTemp {...myWeather} />
                </div>
              </>
            : null
        }
        <div className="action">
          <i
            onClick={fetchWeather}
            className={classNames('fa', 'fa-fw', 'fa-refresh', {'fa-spin': isPending})}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
