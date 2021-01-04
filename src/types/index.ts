/**
 * @description Type for position coordinates properties.
 */
type TPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

/**
 * @description Type for position coordinates errors.
 */
type TPositionError = {
  code: number;
  message: string;
};

/**
 * @description Type for position coordinates options.
 */
type TPositionOptions = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

export {
  TPosition,
  TPositionError,
  TPositionOptions
};
