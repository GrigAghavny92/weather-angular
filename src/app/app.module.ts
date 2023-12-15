import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {CarouselComponent} from "./components/carousel/carousel.component";
import {CurrentWeatherComponent} from "./components/current-weather/current-weather.component";
import {WeatherForecastProvider} from "./service/weather-forecast-provider";
import {LocationSearchComponent} from "./components/location-search/location-search.component";
import {TemperaturePipe} from "./pipes/temperature.pipe";
import {DailyWeatherComponent} from "./components/daily-weather/daily-weather.component";
import {MatSelectModule} from "@angular/material/select";
import {LocationProvider} from "./service/location-provider";
import {DataStoreService} from "./service/data-store.service";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    CurrentWeatherComponent,
    LocationSearchComponent,
    TemperaturePipe,
    DailyWeatherComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSelectModule
  ],
  providers: [
    WeatherForecastProvider,
    LocationProvider,
    DataStoreService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
