import {Component} from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherService: WeatherService;
  lastChange: any;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  refresh() {
    this.lastChange = this.weatherService.calculateTime();
    this.weatherService.updateList();
  }

  getRoute() {
    return this.weatherService.getRoute();
  }


}
