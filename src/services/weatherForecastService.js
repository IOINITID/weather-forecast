class WeatherForecastService {
  constructor() {
    this.apiKey = `0cf9471e82e09b7e34f9ce007f3bbb0d`;
    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  }

  getWeatherData(city) {
    return fetch(`${this.apiUrl}q=${city}&units=metric&lang=ru&appid=${this.apiKey}`)
    .then((response) => response.ok && response.json())
    .catch((error) => error);
  }

  getWeatherGeo(lat, lon) {
    return fetch(`${this.apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`)
    .then((response) => response.ok && response.json())
    .catch((error) => error);
  }
}

export default WeatherForecastService;
