import React, {useEffect, useState} from 'react';
import WeatherForecastService from '../../services/weatherForecastService';

const weatherService = new WeatherForecastService();

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(``);

  const getWeatherData = async (cityName) => {
    const response = await weatherService.getWeatherData(cityName);
    setWeatherData(response);
  };

  const getWeatherGeo = async (lat, lon) => {
    const response = await weatherService.getWeatherGeo(lat, lon);
    setWeatherData(response);
  };

  const getGeolacationPosition = () => navigator.geolocation.getCurrentPosition((position) => {
    getWeatherGeo(position.coords.latitude, position.coords.longitude);
  });

  useEffect(() => {
    if (city) {
      getWeatherData(city);
    }
    if (!city) {
      getGeolacationPosition();
    }
  }, [city]);

  return (
    <div>
      <input type="text" value={city} onChange={(evt) => setCity(evt.target.value)} />
      {
        <div>
          <h1>{weatherData ? weatherData.main.temp.toFixed(0) : null}°C</h1>
          <p>{weatherData ? weatherData.name : null}</p>
          <p>{weatherData ? weatherData.weather[0].main : null}</p>
          <p>{weatherData ? weatherData.weather[0].description : null}</p>
        </div>
      }
    </div>
  );
};

export default App;
