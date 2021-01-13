import React, { useEffect, useState } from 'react';
import WeatherForecastService from '../../services/weatherForecastService';
import Loader from '../loader/loader';
import './app.css';
import { getDirectionByDegrees } from 'degreezzy';
import { getDirectionDescription } from '../../utils/direction';
import { v4 as uuid } from 'uuid';
import { getCapitalizeFirstLetter } from '../../utils/common';
import { motion } from 'framer-motion';

/**
 * @description Interface for position coordinates properties.
 */
interface IPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
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
  timeout?: number;
  maximumAge: number;
}

const weatherService = new WeatherForecastService();

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(false);

  const getWeatherByCityName = (cityName: string): void => {
    weatherService.getWeatherByCityName(cityName).then((response) => {
      setWeatherData((prev) => [...prev, response]);
    });
  };

  const getWeatherByGeolocation = (lat: number, lon: number): void => {
    weatherService.getWeatherByGeolocation(lat, lon).then((response) => {
      setWeatherData((prev) => [response, ...prev]);
      setActiveCard(true);
    });
  };

  const getWeatherByCurrentGeolocation = (): void => {
    const position = (position: IPosition): void => {
      getWeatherByGeolocation(position.coords.latitude, position.coords.longitude);
      weatherData && weatherData.length >= cities.length ? setIsLoading(false) : null;
    };

    const positionError = (positionError: IPositionError): void => {
      console.error('Error message: Geolocation not found.', positionError);
    };

    const positionOptions: IPositionOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(position, positionError, positionOptions);
  };

  const cities: string[] = ['Stavropol', 'Prague', 'Amsterdam', 'Los Angeles', 'Moscow', 'Tokio', 'Seul', 'London'];

  useEffect(() => {
    cities.forEach((item) => {
      getWeatherByCityName(item);
    });

    getWeatherByCurrentGeolocation();
  }, []);

  /** Framer Motion configuration data */
  const containerMotion = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.25,
      },
    },
  };

  const itemMotion = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div className="app" variants={containerMotion} initial="hidden" animate="visible">
      {weatherData &&
        weatherData.map((item, index) => {
          const temperature: string = item.main.temp.toFixed(0);
          const weatherCity: string = item.name;
          const weatherDescription: string = getCapitalizeFirstLetter(item.weather[0].description);
          const temperatureFeelsLike: string = item.main.feels_like.toFixed(0);
          const windDirection: string = getDirectionDescription(getDirectionByDegrees(item.wind.deg));
          const windSpeed: number = Math.round(item.wind.speed);
          const icon: string = `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;
          const activeCardClassName: string = activeCard && index === 0 ? 'card--active' : '';

          return (
            <motion.div key={uuid()} className={`card ${activeCardClassName}`} variants={itemMotion}>
              <p className="card__city">{weatherCity}</p>
              <img className="card__icon" src={icon} width="100" height="100" loading="lazy" alt={weatherDescription} />
              <p className="card__description">{weatherDescription}</p>
              <p className="card__temperature">{`${temperature}°C`}</p>
              <p className="card__feels-like">Ощущается как: {temperatureFeelsLike}°C</p>
              <p className="card__feels-like">Направление ветра: {windDirection}</p>
              <p className="card__feels-like">Скорость ветра: {windSpeed} м/с</p>
            </motion.div>
          );
        })}
    </motion.div>
  );
};

export default App;
