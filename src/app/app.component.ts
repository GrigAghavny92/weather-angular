import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TemperatureType} from "./pipes/temperature.pipe";
import {WeatherForecastProvider} from "./service/weather-forecast-provider";
import {LocationCoordinates} from "./model/coordinates";
import {WeatherResult} from "./model/weather-result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Weather Forecast';

  public loading$ = new BehaviorSubject<boolean>(true);
  public weatherResult$ = new BehaviorSubject<WeatherResult>({} as WeatherResult);

  public tempType = TemperatureType.FAHRENHEIT;
  public tempScales = TemperatureType;

  public drawWeatherTemplate = false;

  constructor(private weatherProvide: WeatherForecastProvider) {}

  ngOnInit() {
    this.addEventListeners();
    this.displayCurrentLocationWeather();
  }

  displayCurrentLocationWeather() {
    if (navigator.geolocation) {
      this.loading$.next(true);
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude}: LocationCoordinates = position.coords;
        this.getWeatherByCoordinates( {latitude, longitude});
      })
    } else {
      alert("User not allowed");
    }
  }

  getWeatherByCoordinates(coordinates: LocationCoordinates) {
    this.drawWeatherTemplate = false;
    this.loading$.next(true);

    this.weatherProvide.getWeather(coordinates)
      .subscribe(weatherForecast => {
        this.drawWeatherTemplate = true;
        this.loading$.next(false);
        this.weatherResult$.next(weatherForecast);
      })
  }

  setTemperatureScale(tempScale: TemperatureType) {
    this.tempType = tempScale;
  }

  addEventListeners() {
     const el = document.getElementById('currentLocation');
     el && el.addEventListener('click', this.displayCurrentLocationWeather.bind(this));
  }
}
