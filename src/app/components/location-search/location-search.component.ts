import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationProvider} from "../../service/location-provider";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {LocationCoordinates} from "../../model/coordinates";
import {LocationBasis} from "../../model/location-list";

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})

export class LocationSearchComponent implements OnInit {
  @Output()
  public selectedLocation: EventEmitter<LocationCoordinates> = new EventEmitter();

  public searchResult$: Observable<LocationBasis[]> = new BehaviorSubject([]);
  public hiddenSearchResult = true;

  public showWarning = false;

  constructor(private locationProvider: LocationProvider) { }

  ngOnInit() {
    this.attachEventListeners();
  }

  searchLocations(event: any) {
    this.showWarning = false;
    const searchValue = event.target.value;
    !searchValue && (this.searchResult$ = of([]))
    searchValue && (this.searchResult$ = this.locationProvider.searchLocationsByName(searchValue)
      .pipe(
        map(data => {
          !data.length && (this.showWarning = true);
          data.length && (this.showWarning = false);
          this.hiddenSearchResult = false;
          return data;
        }),
        catchError((error: any) => {
          throw Error(error);
          return of([]);
        })
        ))
  }

  emitLocationSelected(lat: number, lon: number) {
    this.hiddenSearchResult = true;
    this.selectedLocation.emit({latitude: lat, longitude: lon});
  }

  attachEventListeners() {
    const locationSearchInput = document.getElementById('locationSearchInput');
    locationSearchInput && locationSearchInput.addEventListener('click', () => this.hiddenSearchResult = !this.hiddenSearchResult);
    locationSearchInput && locationSearchInput.addEventListener('input', this.debounceSearchFunction(this.searchLocations.bind(this), 1000));

  }

  private debounceSearchFunction(mainFunction: Function, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };
}
