import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { LoginModal } from './components/login-modal/login-modal';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    Navbar,
    LoginModal,
    Sidebar
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Navbar,
    LoginModal,
    Sidebar
  ]
})
export class SharedModule { }






         