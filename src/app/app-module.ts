import { NgModule } from '@angular/core';
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
import { RegisterFormFooter } from './pages/auth/register/components/register-form-footer/register-form-footer';
import { RegisterFormButtons } from './pages/auth/register/components/register-form-buttons/register-form-buttons';
import { Patient } from './pages/patient/patient';
import { Stats } from './pages/patient/components/stats/stats';
import { Card } from './pages/patient/components/stats/card/card';
import { Appointments } from './pages/patient/components/appointments/appointments';
import { Appointment } from './pages/patient/components/appointments/appointment/appointment';
import { TopBar } from './pages/patient/components/appointments/top-bar/top-bar';
import { Info } from './pages/patient/components/info/info';
import {MainInfo} from './pages/patient/components/info/main-info/main-info';
import {SideInfo} from './pages/patient/components/info/side-info/side-info';
import { BottomInfo } from './pages/patient/components/info/main-info/bottom-info/bottom-info';
import {TopInfo} from './pages/patient/components/info/main-info/top-info/top-info';
import { Login } from './pages/auth/login/login';
import {CookieService} from 'ngx-cookie-service';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth-interceptor';
import {authTokenInterceptor} from './core/interceptors/auth-token-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AnthropometricMeasurements } from './pages/anthropometric-measurements/anthropometric-measurements';
import { Default } from './pages/anthropometric-measurements/components/default/default';
import { StepOne } from './pages/anthropometric-measurements/components/step-one/step-one';
import { StepTwo } from './pages/anthropometric-measurements/components/step-two/step-two';
import { StepThree } from './pages/anthropometric-measurements/components/step-three/step-three';
import {NotesRegister} from './pages/notes-register/notes-register';
import {NotesContainer} from './pages/notes-register/notes-container/notes-container';
import {Note} from './pages/notes-register/note/note';
import {Details} from './pages/notes-register/details/details';
import { ReviewRegister } from './pages/reviews/review-register/review-register';
import { ReviewRating } from './pages/reviews/review-rating/review-rating';
import { RatingDisplay } from './pages/reviews/components/rating-display/rating-display';
import { ReviewCard } from './pages/reviews/components/review-card/review-card';
import { ReviewList } from './pages/reviews/components/review-list/review-list';
import { FormsModule} from '@angular/forms';

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
    RegisterFormFooter,
    RegisterFormButtons,
    Patient,
    MainInfo,
    Stats,
    Card,
    SideInfo,
    Appointments,
    Appointment,
    TopBar,
    Info,
    TopInfo,
    BottomInfo,
    Login,
    AnthropometricMeasurements,
    Default,
    StepOne,
    StepTwo,
    StepThree,
    NotesRegister,
    NotesContainer,
    Note,
    Details,
    ReviewRegister,
    ReviewRating,
    RatingDisplay,
    ReviewCard,
    ReviewList
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    Modal,
    CookieService,
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        authTokenInterceptor
      ])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }