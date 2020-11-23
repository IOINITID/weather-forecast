import React, {useEffect, useState} from 'react';
import WeatherForecastService from '../../services/weatherForecastService';
import Loader from '../loader/loader';
import './app.css';

const weatherService = new WeatherForecastService();

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(``);
  const [isLoading, setIsLoading] = useState(true);

  const getWeatherByCityName = async (cityName) => {
    const response = await weatherService.getWeatherByCityName(cityName);
    setWeatherData(response);
  };

  const getWeatherByGeolocation = async (lat, lon) => {
    const response = await weatherService.getWeatherByGeolocation(lat, lon);
    setWeatherData(response);
    setIsLoading(false);
  };

  const getWeatherByCurrentGeolocation = () => navigator.geolocation.getCurrentPosition((position) => {
    getWeatherByGeolocation(position.coords.latitude, position.coords.longitude);
  });

  useEffect(() => {
    if (city) {
      getWeatherByCityName(city);
    }
    if (!city) {
      getWeatherByCurrentGeolocation();
    }
  }, [city]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <input
        className="search"
        type="search"
        value={city}
        onChange={(evt) => setCity(evt.target.value)}
      />
      {
        weatherData &&
        <div className="weather">
          <img
            className="weather__icon"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            width="100"
            height="100"
          />
          <p className="weather__temperature">{`${weatherData.main.temp.toFixed(0)}°C`}</p>
          <p className="weather__city">{weatherData.name}</p>
          <p className="weather__description">{weatherData.weather[0].description}</p>
          <p className="weather__feels-like">Ощущается как: {weatherData.main.feels_like.toFixed(0)}°C</p>
        </div>
      }
    </div>
  );
};

export default App;
