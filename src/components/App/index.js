import React from 'react';
import WeatherTable from './../WeatherTable';
import CityForm from './../CityForm';
import Header from '../Header';
import './styles.scss';

const App = () => {
  return (
    <>
      <Header />
      <div className="app">
        <CityForm />
        <WeatherTable />
      </div>
    </>
  );
}

export default App;
