import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Modal } from './shared/modal';
import { SharedModule } from './shared/shared-module';
import { CardPatient } from './pages/dashboard/components/card-patient/card-patient';
@NgModule({
  declarations: [
    App,
    CardPatient
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    Modal
  ],
  bootstrap: [App]
})
export class AppModule { }
