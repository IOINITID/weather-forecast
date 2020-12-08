import React, { useEffect, useState } from 'react';
import WeatherForecastService from '../../services/weatherForecastService';
import Loader from '../loader/loader';
import './app.css';
import {getDirectionByDegrees} from 'degreezzy';

/**
 * @description Interface for position coordinates properties.
 */
interface IPosition {
  coords: {
    latitude: number;
    longitude: number;
  }
}

const weatherService = new WeatherForecastService();

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(``);
  const [isLoading, setIsLoading] = useState(true);

  const getWeatherByCityName = async (cityName: string): Promise<void> => {
    const response = await weatherService.getWeatherByCityName(cityName);
    setWeatherData(response);
  };

  const getWeatherByGeolocation = async (lat: number, lon: number): Promise<void> => {
    const response = await weatherService.getWeatherByGeolocation(lat, lon);
    setWeatherData(response);
    setIsLoading(false);
  };

  const getWeatherByCurrentGeolocation = (): void => {
    navigator.geolocation.getCurrentPosition((position: IPosition) => {
      getWeatherByGeolocation(position.coords.latitude, position.coords.longitude);
    });
  };

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
          <p className="weather__feels-like">Направление ветра: {getDirectionByDegrees(weatherData.wind.deg)}</p>
          <p className="weather__feels-like">Скорость ветра: {weatherData.wind.speed}м/с</p>
        </div>
      }
    </div>
  );
};

export default App;