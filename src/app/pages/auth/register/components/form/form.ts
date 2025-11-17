import { Component } from '@angular/core';
import {Auth} from '../../../../../core/services/auth';
import {RegisterRequest} from '../../../../../core/interfaces/api/register-request';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {

  constructor(private authService: Auth) {
  }
  currentStep: number = 1;
  totalSteps: number = 2;

  formData = {
    partOne: {} as any,
    partTwo: {} as any
  }

  onPartOneNext(data: any) {
    this.formData.partOne = data;
    console.log('1', this.formData);
    this.nextStep()
  }

  nextStep(){
    this.currentStep++;
    console.log(this.currentStep);
  }

  previousStep(){
    this.currentStep--;
    console.log(this.currentStep);
  }

  onPartTwoRegister(data: any){
    console.log('PADRE onPartTwoRegister ejecutado');
    this.formData.partTwo = data;
    console.log('2', this.formData);
    this.register()
  }

  evaluateGender(gender: string):number{
    switch (gender) {
      case 'Femenino': return 1;
      case 'Masculino': return 2;
    }
    return 0;
  }

  register(){
    console.log('PADRE register() ejecutado');
    const payload:RegisterRequest = {
      firstName: this.formData.partOne.firstName,
      lastName: this.formData.partOne.lastName,
      professionalLicense: this.formData.partTwo.professionalLicense,
      employmentStart: this.formData.partTwo.employmentStart,
      graduationInstitution: this.formData.partTwo.graduationInstitution,
      currentWorkplace: this.formData.partTwo.currentWorkplace,
      gender: this.evaluateGender(this.formData.partTwo.gender),
      email: this.formData.partOne.email,
      password: this.formData.partOne.password,
    }

    console.log('3', payload);
    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('Registro hecho',res);
      },
      error: (err) => {
        console.log('Error al registrar',err);
      }
    })
  }
}
