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

export {
  IPosition,
  IPositionError,
  IPositionOptions
};
