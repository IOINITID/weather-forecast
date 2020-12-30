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

/**
 * @description Interface for Card props.
 */
interface ICard {
  data: {
    temperature: string;
    weatherCity: string;
    weatherDescription: string;
    temperatureFeelsLike: string;
    windDirection: string;
    windSpeed: number;
    icon: string;
    activeCardClassName: string;
  }
};

export {
  IPosition,
  IPositionError,
  IPositionOptions,
  ICard
};
