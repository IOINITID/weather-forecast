class WeatherForecastService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = `0cf9471e82e09b7e34f9ce007f3bbb0d`;
    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  }

  public getWeatherByCityName(city: string): Promise<Response> {
    const fetchUrl: string = `${this.apiUrl}q=${city}&units=metric&lang=ru&appid=${this.apiKey}`;

    return fetch(fetchUrl)
      .then((response) => response.ok && response.json())
      .catch((error) => error);
  }

  public getWeatherByGeolocation(lat: number, lon: number): Promise<Response> {
    const fetchUrl: string = `${this.apiUrl}lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${this.apiKey}`;

    return fetch(fetchUrl)
      .then((response) => response.ok && response.json())
      .catch((error) => error);
  }
}

export default WeatherForecastService;
