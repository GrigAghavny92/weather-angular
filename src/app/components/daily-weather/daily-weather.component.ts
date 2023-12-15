import {Component, Input, OnInit} from '@angular/core';
import {DailyWeather} from "../../model/daily-weather";
import {TemperatureType} from "../../pipes/temperature.pipe";
import {DateTimeUtils} from "../../utils/date-time-utils";

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit {

    @Input()
    forecast!: DailyWeather;

    @Input()
    timezone!: string;

    @Input()
    public tempType: TemperatureType = TemperatureType.FAHRENHEIT;

    public date!: string;

    constructor() { }

    ngOnInit(): void {
        this.date = this.getForecastDateString();
    }

    getForecastDateString() {
      const localDate = this.toLocalDatetime(new Date());
      const date = new Date(Number(this.forecast.dt * 1000));

      if (date.getMonth() == localDate.getMonth()
          && date.getDate() == localDate.getDate()
          && date.getFullYear() == localDate.getFullYear()) {
          return 'Today';
      }

      return date.toLocaleString('default', {
          month: 'short',
          day  : '2-digit',
          weekday: 'short',
          timeZone: 'UTC',
      });
    }

    toLocalDatetime(date: Date) {
        return DateTimeUtils.convertTimezone(date, this.timezone);
    }
}
