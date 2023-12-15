import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'temperature',
  pure: true
})
export class TemperaturePipe implements PipeTransform {

  transform(temperature: number, type: TemperatureType) {
    if(type === TemperatureType.FAHRENHEIT) {
      return `${(temperature * (9/5) + 32).toFixed(2)}\xB0\F`;
    }
    return `${temperature.toFixed(2)}\xB0\C`;
  }
}

export enum TemperatureType {
  CELSIUS,
  FAHRENHEIT
}
