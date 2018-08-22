import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';

export interface ICity {
  name: string;
  temp: string;
  selected: boolean;
}


let b = {
  'coord': {'lon': -85.67, 'lat': 11.48},
  'weather': [{'id': 802, 'main': 'Clouds', 'description': 'scattered clouds', 'icon': '03d'}],
  'base': 'stations',
  'main': {'temp': 31, 'pressure': 1009, 'humidity': 66, 'temp_min': 31, 'temp_max': 31},
  'visibility': 10000,
  'wind': {'speed': 2.1, 'deg': 360},
  'clouds': {'all': 40},
  'dt': 1534888800,
  'sys': {'type': 1, 'id': 4215, 'message': 0.0046, 'country': 'NI', 'sunrise': 1534851148, 'sunset': 1534895906},
  'id': 3617052,
  'name': 'Tel Aviv',
  'cod': 200
};

// https://api.openweathermap.org/data/2.5/weather?q=Tel-Aviv&appid=2216d706dc30557bf642099e84018009&units=metric
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private cities: ICity[] = [
    {name: 'Tel-Aviv', temp: '-', selected: true},
    {name: 'London', temp: '-', selected: false},
    {name: 'Moscow', temp: '-', selected: false},
    {name: 'Ramat-Gan', temp: '-', selected: false},
    {name: 'New-York', temp: '-', selected: false},
    {name: 'Paris', temp: '-', selected: false},
    {name: 'Cairo', temp: '-', selected: false},
    {name: 'Rome', temp: '-', selected: false},
    {name: 'Frankfurt', temp: '-', selected: false},
    {name: 'Washington', temp: '-', selected: false}
  ];
  private router: Router;
  private http: HttpClient;
  listUpdated = new Subject<void>();
  initialMillTime = 0;
  lastChange: any;
  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }

  fetchTemp(city: ICity) {
    const formattedCity: string = city.name.replace('-', ' ');
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}` +
      `&appid=2216d706dc30557bf642099e84018009&units=metric`).subscribe(res => {
      city.temp = res.main.temp;
    }, error => {
      city.temp = 'cannot get';
    });

  }

  updateList() {
    this.cities.forEach((city: ICity) => {
      if (city.selected) {
        this.fetchTemp(city);
      }
    });
    this.listUpdated.next();
  }

  // fetchTemp(city: string) {
  //   const formattedCity: string = city.replace('-', ' ');
  //   this.http.get(`// https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=
  //   2216d706dc30557bf642099e84018009&units=metric`)
  //     .map((response: Response) => {
  //       const data = response.json();
  //       const temp = data.main.temp;
  //       console.log(temp);
  //       // return temp;
  //     });
  // }

  getRoute() {
    return this.router.url;
  }

  getCities(): ICity[] {
    if (this.router.url === '/main') {
      return this.cities.filter((city) => {
        return city.selected === true;
      });
    } else {
      return this.cities;
    }
  }

  calculateTime() {
    const date = new Date();
    if (this.initialMillTime !== 0) {
      const delta = date.getTime() - this.initialMillTime;
      if (delta > 60000) {
        this.lastChange = 'Last Update: ' + Math.floor(delta / 60000) + ' Minutes ago';
      } else if (delta > 1000) {
        this.lastChange = 'Last Update: ' + Math.floor(delta / 1000) + ' Seconds ago';
      } else {
        this.lastChange = 'Last Update: ' + delta + ' Millisecond ago';
      }
    } else {
      this.lastChange = 'First Update';
    }
    this.initialMillTime = date.getTime();
    return this.lastChange;
  }
}
