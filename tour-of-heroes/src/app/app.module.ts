import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InMemoryDataService} from "./service/dao/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {SharedModule} from "./shared/shared.module";
import {DashboardComponent} from "./routes/dashboard/dashboard.component";
import {HeroDetailComponent} from "./routes/hero-detail/hero-detail.component";
import {HeroSearchComponent} from "./routes/dashboard/hero-search/hero-search.component";
import {HeroesComponent} from "./routes/heroes/heroes.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
