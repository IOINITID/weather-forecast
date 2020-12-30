import React, { useEffect, useState } from 'react';
import './card-list.css';
import WeatherForecastService from '../../services/weatherForecastService';
import Card from '../card/card';
import Loader from '../loader/loader';
import { getDirectionByDegrees } from 'degreezzy';
import { getDirectionDescription } from '../../utils/direction';
import { v4 as uuid } from 'uuid';
import { getCapitalizeFirstLetter } from '../../utils/common';
import { IPosition, IPositionError, IPositionOptions } from '../../interfaces/index';

const weatherService = new WeatherForecastService();

const CardList = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(false);

  const getWeatherByCityName = (cityName: string): void => {
    weatherService.getWeatherByCityName(cityName)
      .then((response) => {
        setWeatherData((prev) => [...prev, response]);
      });
  };

  const getWeatherByGeolocation = (lat: number, lon: number): void => {
    weatherService.getWeatherByGeolocation(lat, lon)
      .then((response) => {
        setWeatherData((prev) => [response, ...prev]);
        setIsLoading(false);
        setActiveCard(true);
      });
  };

  const getWeatherByCurrentGeolocation = (): void => {
    const position = (position: IPosition): void => {
      getWeatherByGeolocation(position.coords.latitude, position.coords.longitude);
    };

    const positionError = (positionError: IPositionError): void => {
      console.log(positionError);
      setIsLoading(false);
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

    getWeatherByCurrentGeolocation();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className="card__list">
      {
        weatherData &&
        weatherData.map((item, index) => {
          const temperature: string = item.main.temp.toFixed(0);
          const weatherCity: string = item.name;
          const weatherDescription: string = getCapitalizeFirstLetter(item.weather[0].description);
          const temperatureFeelsLike: string = item.main.feels_like.toFixed(0);
          const windDirection: string = getDirectionDescription(getDirectionByDegrees(item.wind.deg));
          const windSpeed: number = Math.round(item.wind.speed);
          const icon: string = `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;
          const activeCardClassName: string = activeCard && index === 0 ? `card--active` : `card--default`;
          const data = {
            temperature,
            weatherCity,
            weatherDescription,
            temperatureFeelsLike,
            windDirection,
            windSpeed,
            icon,
            activeCardClassName
          };

          return (
            <li key={uuid()}>
              <Card data={data} />
            </li>
          );
        })
      }
    </ul>
  );
};

export default CardList;
