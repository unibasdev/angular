import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertComponent} from './components/alert/alert.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {environment} from '../../environments/environment';
import {RouterModule} from "@angular/router";
import { VotesTableComponent } from './components/votes-table/votes-table.component';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>(resolve => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    PageNotFoundComponent,
    VotesTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AlertComponent,
    VotesTableComponent
  ]
})
export class SharedModule {
}
