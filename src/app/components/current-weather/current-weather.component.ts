import {Component, Input, OnInit} from "@angular/core";
import {TemperatureType} from "../../pipes/temperature.pipe";
import {CurrentWeather} from "../../model/current-weather";
import {DateTimeUtils} from "../../utils/date-time-utils";

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.component.html',
  styleUrls: ['current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit{

  @Input()
  public currentWeather: CurrentWeather = {} as CurrentWeather;

  @Input()
  public timezone: string = '';

  @Input()
  public tempType: TemperatureType = TemperatureType.FAHRENHEIT;

  public localDate!: string;

  public locationName!: string;

  constructor() { }

  ngOnInit(): void {
    this.localDate = this.getLocalDateString();
    this.locationName = this.timezone.split('/')[1];
  }

  getOutsideDescription() {
    return this.currentWeather.weather[0].description;
  }

  getLocalDateString() {
    let date = this.toLocalDatetime(new Date());
    return `${DateTimeUtils.getWeekdayName(date)} ${DateTimeUtils.getDateTimeString(date)}`;
  }

  toLocalDatetime(date: Date) {
    return DateTimeUtils.convertTimezone(date, String(this.timezone));
  }
}
