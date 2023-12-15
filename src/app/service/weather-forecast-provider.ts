import {Injectable} from '@angular/core';
import {Observable, of, shareReplay} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";

import {DataStoreService} from "./data-store.service";
import {LocationCoordinates} from "../model/coordinates";
import {WeatherResult} from "../model/weather-result";
import {BaseProvider} from "./base-provider";

@Injectable()
export class WeatherForecastProvider extends BaseProvider {

  public static readonly API_URL = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor(private http: HttpClient, private datastore: DataStoreService) {
    super();
  }

  getWeather(coordinates: LocationCoordinates): Observable<WeatherResult> {
    return this.datastore.getWeather(coordinates, () => {
      const options =
        {
          params: new HttpParams()
            .set('appid', WeatherForecastProvider.APP_ID)
            .set('lat', coordinates.latitude)
            .set('lon', coordinates.longitude)
            .set('exclude', ['hourly','minutely'].join(','))
            .set('units', 'metric')
        }
      return this.http.get<WeatherResult>(WeatherForecastProvider.API_URL, options)
        .pipe(
          shareReplay({ bufferSize: 1, refCount: true }),
          this.handleError(of({} as WeatherResult))
        )
    })
  }
}



