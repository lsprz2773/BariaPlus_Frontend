import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  currentStep: number = 1;
  totalSteps: number = 2;

  nextStep(){
    this.currentStep++;
    console.log(this.currentStep);
  }

  previousStep(){
    this.currentStep--;
    console.log(this.currentStep);
  }

  register(){
    console.log('register')
  }
}
