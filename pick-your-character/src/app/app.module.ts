import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {TaskComponent} from "./routes/task/task.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserDaoService} from "./service/dao/user-dao.service";
import {TokenInterceptorService} from "./service/interceptor/http-interceptor.service";
import {LoadingInterceptorService} from "./service/interceptor/loading-interceptor.service";
import {InMemoryTaskDAOService} from "./service/dao/in-memory/in-memory-task-dao.service";
import {TaskDaoService} from "./service/dao/task-dao.service";
import {InMemoryUserDAOService} from "./service/dao/in-memory/in-memory-user-dao.service";
import {PersonComponent} from "./routes/task/person/person.component";
import {CharacterComponent} from "./routes/task/character/character.component";
import {CharacterDaoService} from "./service/dao/character-dao.service";
import {InMemoryCharacterDAOService} from "./service/dao/in-memory/in-memory-character-dao.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./service/dao/in-memory/in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    PersonComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true},
    {provide: UserDaoService, useClass: InMemoryUserDAOService},
    {provide: TaskDaoService, useClass: InMemoryTaskDAOService},
    {provide: CharacterDaoService, useClass: InMemoryCharacterDAOService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
