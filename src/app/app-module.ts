import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Modal } from './shared/modal';
import { SharedModule } from './shared/shared-module';
import { ViewsLayout } from './layout/views-layout/views-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { PatientCard } from './pages/dashboard/components/patient-card/patient-card';
import { PatientRegister } from './pages/patient-register/patient-register';
import { Filter } from './pages/dashboard/components/filter/filter';
import { SearchBar } from './pages/dashboard/components/search-bar/search-bar';
import { PersonalInfo } from './pages/patient-register/components/form/personal-info/personal-info';
import { Allergies } from './pages/patient-register/components/form/allergies/allergies';
import { Form } from './pages/patient-register/components/form/form';

@NgModule({
  declarations: [
    App,
    ViewsLayout,
    Dashboard,
    PatientCard,
    PatientRegister,
    Filter,
    SearchBar,
    PersonalInfo,
    Allergies,
    Form
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
