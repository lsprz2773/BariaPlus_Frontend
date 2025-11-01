import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing/landing-page/landing-page';
import { ViewsLayout } from './layout/views-layout/views-layout';
import { Dashboard } from './pages/dashboard/dashboard';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: '',
    component: ViewsLayout,
    children: [{
      path: 'dashboard', 
      component: Dashboard
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
