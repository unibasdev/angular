import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PaginaNonTrovataComponent } from './components/pagina-non-trovata/pagina-non-trovata.component';
import { EsameEditComponent } from './routes/esame-edit/esame-edit/esame-edit.component';
import { EsameFormComponent } from './routes/esame-edit/esame-form/esame-form.component';
import { LoginComponent } from './routes/login/login/login.component';
import { DettaglioStudenteComponent } from './routes/studente/dettaglio-studente/dettaglio-studente.component';
import { ListaEsamiComponent } from './routes/studente/lista-esami/lista-esami.component';
import { StudenteComponent } from './routes/studente/studente/studente.component';
import { ListaStudentiComponent } from './routes/studenti/lista-studenti/lista-studenti.component';
import { RicercaStudentiComponent } from './routes/studenti/ricerca-studenti/ricerca-studenti.component';
import { StudentiComponent } from './routes/studenti/studenti/studenti.component';
import { InMemoryRepository } from './service/dao/in-memory-repository';
import { AuthTokenInterceptor } from './service/interceptors/auth-token.interceptor';
import { ErrorInterceptor } from './service/interceptors/error.interceptor';
import { LoadingInterceptor } from './service/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PaginaNonTrovataComponent,
    LoadingComponent,
    LoginComponent,
    StudentiComponent,
    StudenteComponent,
    RicercaStudentiComponent,
    ListaStudentiComponent,
    DettaglioStudenteComponent,
    ListaEsamiComponent,
    EsameEditComponent,
    EsameFormComponent
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
