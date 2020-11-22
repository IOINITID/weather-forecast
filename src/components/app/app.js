import React, { useEffect, useState } from 'react';
import WeatherForecastService from '../../services/weatherForecastService';
import './app.css';

const weatherService = new WeatherForecastService();

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(``);

  const getWeatherByCityName = async (cityName) => {
    const response = await weatherService.getWeatherByCityName(cityName);
    setWeatherData(response);
  };

  const getWeatherByGeolocation = async (lat, lon) => {
    const response = await weatherService.getWeatherByGeolocation(lat, lon);
    setWeatherData(response);
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

  return (
    <div className="container">
      <input
        className="search"
        type="search"
        value={city}
        onChange={(evt) => setCity(evt.target.value)}
      />
      {
        <div className="weather">
          {
            weatherData &&
            <img
              className="weather__icon"
              src={`http://openweathermap.org/img/wn/${weatherData && weatherData.weather[0].icon}@4x.png`}
              width="100"
              height="100"
            />

          }
          <p className="weather__temperature">
            {
              weatherData && `${weatherData.main.temp.toFixed(0)}°C`
            }
          </p>
          <p className="weather__city">
            {
              weatherData && weatherData.name
            }
          </p>
          <p className="weather__description">
            {
              weatherData && weatherData.weather[0].description
            }
          </p>
        </div>
      }
    </div>
  );
};

export default App;
