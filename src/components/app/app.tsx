import React, { Fragment, useEffect, useState } from 'react';
import WeatherForecastService from '../../services/weatherForecastService';
import Loader from '../loader/loader';
import './app.css';
import { getDirectionByDegrees } from 'degreezzy';
import { getDirectionDescription } from '../../utils/direction';
import { v4 as uuid } from 'uuid';

/**
 * @description Interface for position coordinates properties.
 */
interface IPosition {
  coords: {
    latitude: number;
    longitude: number;
  }
}

/**
 * @description Interface for position coordinates errors.
 */
interface IPositionError {
  code: number;
  message: string;
}

/**
 * @description Interface for position coordinates options.
 */
interface IPositionOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

const weatherService = new WeatherForecastService();

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState(``);
  const [isLoading, setIsLoading] = useState(true);

  const getWeatherByCityName = async (cityName: string): Promise<void> => {
    const response = await weatherService.getWeatherByCityName(cityName);
    setWeatherData((prev) => [...prev, response]);
  };

  const getWeatherByGeolocation = async (lat: number, lon: number): Promise<void> => {
    const response = await weatherService.getWeatherByGeolocation(lat, lon);
    // setWeatherData(response);
    setIsLoading(false);
  };

  const getWeatherByCurrentGeolocation = (): void => {
    const position = (position: IPosition): void => {
      getWeatherByGeolocation(position.coords.latitude, position.coords.longitude);
    };

    const positionError = (positionError: IPositionError): void => {
      console.log(positionError);
    };

    const positionOptions: IPositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(position, positionError, positionOptions);
  };

  const cities = [`Stavropol`, `Prague`, `Amsterdam`, `Los Angeles`, `Moscow`, `Tokio`, `Seul`, `London`];

  useEffect(() => {
    cities.forEach((item) => {
      getWeatherByCityName(item);
    });

    if (!city) {
      getWeatherByCurrentGeolocation();
    }
  }, [city]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      {
        weatherData.length > 0 &&
        weatherData.map((item) => {
          const temperature = item.main.temp.toFixed(0);
          const weatherCity = item.name;
          const weatherDescription = item.weather[0].description;
          const temperatureFeelsLike = item.main.feels_like.toFixed(0);
          const windDirection = getDirectionDescription(getDirectionByDegrees(item.wind.deg));
          const windSpeed = item.wind.speed;
          const icon: string = `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;

          return (
            <div key={uuid()} className="card">
              <p className="card__city">{weatherCity}</p>
              <img className="card__icon" src={icon} width="100" height="100" />
              <p className="card__description">{weatherDescription}</p>
              <p className="card__temperature">{`${temperature}°C`}</p>
              <p className="card__feels-like">Ощущается как: {temperatureFeelsLike}°C</p>
              <p className="card__feels-like">Направление ветра: {windDirection}</p>
              <p className="card__feels-like">Скорость ветра: {windSpeed}м/с</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default App;
