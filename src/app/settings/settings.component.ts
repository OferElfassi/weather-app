import {Component, OnInit} from '@angular/core';
import {ICity, WeatherService} from '../weather.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  list: ICity[] = [];

  weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  ngOnInit() {
  }

}
