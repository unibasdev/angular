import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryRepository } from './service/dao/in-memory-repository';
import { GiocaPartitaComponent } from './routes/gioca-partita/components/gioca-partita/gioca-partita.component';
import { ListaPartiteComponent } from './routes/storico/components/storico/lista-partite.component';
import { PartitaComponent } from './routes/storico/components/partita/partita.component';
import { NuovaPartitaComponent } from './routes/nuova-partita/components/nuova-partita/nuova-partita.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NuovaPartitaComponent,
    GiocaPartitaComponent,
    ListaPartiteComponent,
    PartitaComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryRepository)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
