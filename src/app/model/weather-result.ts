import {DailyWeather} from "./daily-weather";
import {CurrentWeather} from "./current-weather";

export interface WeatherResult {
  timezone: string,
  current: CurrentWeather,
  daily:  DailyWeather[]
}
