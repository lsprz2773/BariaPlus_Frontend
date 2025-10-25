import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';
import { LoginModal } from './shared/components/login-modal/login-modal';
import { CommonModule } from '@angular/common';
import { Modal } from './shared/modal';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [
    App
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
