import {DailyWeather} from "./weather-forecast";
import {CurrentWeather} from "./current-weather";

export interface WeatherResult {
  timezone: string,
  current: CurrentWeather,
  daily:  DailyWeather[]
}
