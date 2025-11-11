import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form-buttons',
  standalone: false,
  templateUrl: './register-form-buttons.html',
  styleUrl: './register-form-buttons.css'
})
export class RegisterFormButtons {
  step: number = 2;
}
