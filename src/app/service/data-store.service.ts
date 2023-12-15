import {Observable} from "rxjs";

import {LocationCoordinates} from "../model/coordinates";

export class DataStoreService {

  private static readonly LOCATION_KEY = 'location';
  private static readonly WEATHER_KEY = 'current-weather';

  private storage: Map<string, any> = new Map<string, any>();

  getLocations(name: string, loader: any) {
      return this.getFromStore([name, DataStoreService.LOCATION_KEY], loader);
    }

  getWeather(coordinates: LocationCoordinates, loader: any) {
    return this.getFromStore([coordinates, DataStoreService.WEATHER_KEY], loader);
  }

  private getFromStore(key: any[], loader: () => Observable<any>) {
    const cacheKey = JSON.stringify(key);
    if (!this.storage.has(cacheKey)) {
      this.storage.set(cacheKey, loader());
    }
      return this.storage.get(cacheKey);
  }
}
