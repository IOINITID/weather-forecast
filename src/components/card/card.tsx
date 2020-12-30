import React from 'react';
import './card.css';
import { ICard } from '../../interfaces/index';

const Card = (props: ICard) => {
  const {
    data: {
      temperature,
      weatherCity,
      weatherDescription,
      temperatureFeelsLike,
      windDirection,
      windSpeed,
      icon,
      activeCardClassName,
    }
  } = props;

  return (
    <div className={`card ${activeCardClassName}`}>
      <p className="card__city">{weatherCity}</p>
      <img className="card__icon" src={icon} width="100" height="100" loading="lazy" />
      <p className="card__description">{weatherDescription}</p>
      <p className="card__temperature">{`${temperature}°C`}</p>
      <p className="card__feels-like">Ощущается как: {temperatureFeelsLike}°C</p>
      <p className="card__feels-like">Направление ветра: {windDirection}</p>
      <p className="card__feels-like">Скорость ветра: {windSpeed} м/с</p>
    </div>
  );
};

export default Card;
