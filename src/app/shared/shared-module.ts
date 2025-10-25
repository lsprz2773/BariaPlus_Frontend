import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { LoginModal } from './components/login-modal/login-modal';



@NgModule({
  declarations: [
    Navbar,
    LoginModal
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Navbar,
    LoginModal
  ]
})
export class SharedModule { }
