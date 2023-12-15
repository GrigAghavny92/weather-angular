import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {ProviderBase} from "./provider-base";
import {DataStoreService} from "./data-store.service";
import {LocationBasis} from "../model/location-list";

@Injectable()
export class LocationProvider extends ProviderBase {

  public static readonly API_URL = 'http://api.openweathermap.org/geo/1.0/direct';

  constructor(private http: HttpClient, private dataStore: DataStoreService) {
    super();
  }

  searchLocationsByName(name: string): Observable<any> {
    return this.dataStore.getLocations(name, () => {
      const options =
        {
          params: new HttpParams()
            .set('appid', LocationProvider.APP_ID)
            .set('q', name)
            .set('limit', 5)
        }
      return this.http.get<LocationBasis[]>(LocationProvider.API_URL, options)
        .pipe(this.handleError(of([])))
    })
  }
}
