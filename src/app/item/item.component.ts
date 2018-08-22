import {Component, Input, OnInit} from '@angular/core';
import {ICity, WeatherService} from '../weather.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() city: ICity;
  weatherService: WeatherService;

  checked(event) {
    console.log(event.target.checked);
    this.city.selected = event.target.checked;
  }

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }
  getRoute() {
    return this.weatherService.getRoute();
  }
  ngOnInit() {
  }

}
