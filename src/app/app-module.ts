import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Modal } from './shared/modal';
import { SharedModule } from './shared/shared-module';
import { ViewsLayout } from './layout/views-layout/views-layout';
import { Dashboard } from './pages/dashboard/dashboard';
@NgModule({
  declarations: [
    App,
    ViewsLayout,
    Dashboard
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
