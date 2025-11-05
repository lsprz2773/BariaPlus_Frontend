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
import { UserProfile } from './pages/user-profile/user-profile';
import { Reviews } from './pages/reviews/reviews';
import { ProfileInfo } from './pages/user-profile/components/profile-info/profile-info';
import { Register } from './pages/auth/register/register';
import { Form } from './pages/auth/register/components/form/form';
import { PartOne } from './pages/auth/register/components/part-one/part-one';
import { PartTwo } from './pages/auth/register/components/part-two/part-two';
import { RegisterFormFooter } from './pages/auth/register/components/register-form-footer/register-form-footer';
import { RegisterFormButtons } from './pages/auth/register/components/register-form-buttons/register-form-buttons';

@NgModule({
  declarations: [
    App,
    ViewsLayout,
    Dashboard,
    PatientCard,
    PatientRegister,
    Filter,
    SearchBar,
    UserProfile,
    Reviews,
    ProfileInfo,
    Register,
    Form,
    PartOne,
    PartTwo,
    RegisterFormFooter,
    RegisterFormButtons,

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
