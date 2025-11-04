import { Component } from '@angular/core';
import { FormItem } from '../../core/interfaces/form-item';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.css'
})
export class PatientRegister {

  //informacionpersonal
  personalInfoItems: FormItem[] = [
    { 
      type: 'text', 
      label: 'Nombre', 
      placeholder: 'Nombre', 
      name: 'name', 
      required: true 
    },
    { 
      type: 'text', 
      label: 'Apellidos', 
      placeholder: 'Apellidos', 
      name: 'lastname', 
      required: true 
    },
    { 
      type: 'date', 
      label: 'Fecha de nacimiento', 
      placeholder: '', 
      name: 'birthdate', 
      required: true 
    },
    { 
      type: 'select', 
      label: 'Genero', 
      placeholder: '', 
      name: 'gender', 
      options: ['Masculino', 'Femenino'], 
      required: true 
    },
    { 
      type: 'tel', 
      label: 'Número de emergencia', 
      placeholder: 'Número de emergencia', 
      name: 'emergencyNumber', 
      required: true 
    }
  ]

  //aca el resto de pasos
}
