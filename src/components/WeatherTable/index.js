import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { remove } from './../../slices/cities';
import { fetchWeather } from './../../slices/weather';
import WeatherAndTemp from './../WeatherAndTemp';
import Timezone from '../Timezone';
import './styles.scss';

const WeatherTable = () => {
  const dispatch = useDispatch();
  const citiesList = useSelector((state) => state.cities.list);
  const pendings = useSelector((state) => state.weather.pendings);

  useEffect(() => {
    citiesList.forEach(c => {
      if(!c.fetchedData && !pendings[c.uuid]) {
        fetchCity(c);
      }
    })
  }, [citiesList]);

  const fetchCity = (c) => {
    dispatch(fetchWeather(c.uuid));
  }

  const removeCity = (c) => {
    dispatch(remove(c.uuid));
  }

  return citiesList?.length
    ? <div className="weather-table">
        <div className="header-row">City</div>
        <div className="header-row">Local time</div>
        <div className="header-row">Weather/Temp</div>
        <div className="header-row"></div>
        {citiesList.map((c, i) => (
          <React.Fragment key={c.uuid}>
            <div className={classNames('row', {'odd-row': i % 2}, {'error': c.hasError})}>{c.name}</div>
            <div className={classNames('row', {'odd-row': i % 2})}>
              <Timezone offsetInSeconds={c.timezone} />
            </div>
            <div className={classNames('row', {'odd-row': i % 2})}>
              <WeatherAndTemp {...c} />
            </div>
            <div className={classNames('row', 'actions-cell', {'odd-row': i % 2})}>
              <button onClick={() => fetchCity(c)} disabled={pendings[c.uuid]}>
                <i className={classNames('fa', 'fa-refresh', {'fa-spin': pendings[c.uuid]})} />
              </button>
              <button onClick={() => removeCity(c)} disabled={pendings[c.uuid]}>
                <i className="fa fa-trash" />
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    : <div className="no-data">There are no cities to show yet. Add one)</div>
};

export default WeatherTable;
