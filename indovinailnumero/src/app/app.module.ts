import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuovaPartitaComponent } from './components/nuova-partita/nuova-partita.component';
import { GiocaPartitaComponent } from './components/gioca-partita/gioca-partita.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryRepository } from './dao/in-memory-repository';

@NgModule({
  declarations: [
    AppComponent,
    NuovaPartitaComponent,
    GiocaPartitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryRepository)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
