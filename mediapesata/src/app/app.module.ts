import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginaNonTrovataComponent } from './components/pagina-non-trovata/pagina-non-trovata.component';
import { LoginComponent } from './routes/login/login/login.component';
import { StudenteComponent } from './routes/studente/studente/studente.component';
import { StudentiComponent } from './routes/studenti/studenti/studenti.component';
import { InMemoryRepository } from './service/dao/in-memory-repository';
import { ErrorInterceptor } from './service/interceptors/error.interceptor';
import { LoadingInterceptor } from './service/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RicercaStudentiComponent } from './routes/studenti/ricerca-studenti/ricerca-studenti.component';
import { ListaStudentiComponent } from './routes/studenti/lista-studenti/lista-studenti.component';
import { AuthTokenInterceptor as AuthTokenInterceptor } from './service/interceptors/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    StudentiComponent,
    StudenteComponent,
    PaginaNonTrovataComponent,
    RicercaStudentiComponent,
    ListaStudentiComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    environment.backendStrategy === 'MOCK' ? HttpClientInMemoryWebApiModule.forRoot(InMemoryRepository, {apiBase: '/api/v1'}) : []
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
