import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import { BorderFocusDirective } from './directives/border-focus.directive';
import { HeroNamePipe } from './pipes/hero-name.pipe';
import {MessagesComponent} from "./components/messages/messages.component";

@NgModule({
  declarations: [
    BorderFocusDirective,
    HeroNamePipe,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BorderFocusDirective,
    HeroNamePipe,
    MessagesComponent
  ]
})
export class SharedModule {
}
