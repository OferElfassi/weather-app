import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {WeatherService} from './weather.service';
import {SettingsComponent} from './settings/settings.component';
import {ItemComponent} from './item/item.component';
import {ListComponent} from './list/list.component';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {path: 'main', component: ListComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', redirectTo: '/main'}
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ItemComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
