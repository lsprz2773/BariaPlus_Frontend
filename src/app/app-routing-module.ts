import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing/landing-page/landing-page';
import { ViewsLayout } from './layout/views-layout/views-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { PatientRegister } from './pages/patient-register/patient-register';
import { UserProfile } from './pages/user-profile/user-profile';
import { Reviews } from './pages/reviews/reviews';
import { Register } from './pages/auth/register/register';
import { Patient } from './pages/patient/patient';
import { AnthropometricMeasurements } from './pages/anthropometric-measurements/anthropometric-measurements';
import { NotesRegister } from './pages/notes-register/notes-register';
import { Details } from './pages/notes-register/details/details';
import { ReviewRegister } from './pages/reviews/review-register/review-register';
import { ReviewRating } from './pages/reviews/review-rating/review-rating';
import {StatsView} from './pages/stats-view/stats-view';
import { Analysis } from './pages/analysis/analysis';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'user-register',
    component: Register
  },
  {
    path: '',
    component: ViewsLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'patient-register',
        component: PatientRegister
      },
      {
        path: 'user-profile',
        component: UserProfile
      },
      {
        path: 'reviews',
        component: Reviews,
        children: [
          {
            path: '',
            redirectTo: 'registro',
            pathMatch: 'full'
          },
          {
            path: 'registro',
            component: ReviewRegister
          },
          {
            path: 'promedio',
            component: ReviewRating
          }
        ]
      },
      {
        path: 'patient/:id',
        component: Patient
      },
      {
        path: 'measurements',
        component: AnthropometricMeasurements
      },
      {
        path: 'note-register',
        component: NotesRegister
      },
      {
        path: 'notes-details',
        component: Details
      },
      {
        path: 'stats/:patientId',
        component: StatsView
      },
      {
        path: 'analysis/:id',
        component: Analysis
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
