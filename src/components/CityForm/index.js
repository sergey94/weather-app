import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from './../../slices/cities';
import './styles.scss';

const CityForm = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(city) {
      dispatch(add(city));
      setCity('');
    }
  }

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="city-form">
      <input type="text" onChange={handleChange} value={city} placeholder="Enter a city name"/>
      <button type="submit"><i className="fa fa-plus" /></button>
    </form>
  );
}

export default CityForm;
