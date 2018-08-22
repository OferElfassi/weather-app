import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICity, WeatherService} from '../weather.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  cities: ICity[] = [];
  subscription: Subscription;
  weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  ngOnInit() {
    this.cities = this.weatherService.getCities();
    this.subscription = this.weatherService.listUpdated.subscribe(() => {
      this.cities = this.weatherService.getCities();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
