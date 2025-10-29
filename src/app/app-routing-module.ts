import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing/landing-page/landing-page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
