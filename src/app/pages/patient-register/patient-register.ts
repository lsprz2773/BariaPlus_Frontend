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
      placeholder: 'Nombre', 
      name: 'name', 
      required: true 
    },
    { 
      type: 'text', 
      placeholder: 'Apellidos', 
      name: 'lastname', 
      required: true 
    },
    { 
      type: 'date', 
      placeholder: 'Fecha de nacimiento', 
      name: 'birthdate', 
      required: true 
    },
    { 
      type: 'select', 
      placeholder: 'Sexo', 
      name: 'gender', 
      options: ['Masculino', 'Femenino'], 
      required: true 
    },
    { 
      type: 'tel', 
       placeholder: 'Número de emergencia', 
      name: 'emergencyNumber', 
      required: true 
    }
  ]

  allergies: FormItem[] = [
    { 
      type: 'text', 
      placeholder: 'Nombre de la alergia', 
      name: 'allergie', 
      required: true 
    },
    { 
      type: 'text', 
      placeholder: 'Describa los sintomas de la alergia', 
      name: 'description', 
      required: true 
    }
  ]

    illness: FormItem[] = [
    { 
      type: 'text', 
      placeholder: 'Nombre de la enfermedad', 
      name: 'illness', 
      required: true 
    },
    { 
      type: 'select', 
      placeholder: 'Estado actual', 
      name: 'actual_state', 
      required: true 
    }
  ]

    records: FormItem[] = [
    { 
      type: 'select', 
      placeholder: 'Tipo de antecedent', 
      name: 'allergie', 
      options: ['Heredorfamiliares', 'Patológicos', 'No patológicos', 'Ginecobstétricos', 'Tratamientos de obesidad', 'Psicológico/Social'],
      required: true 
    },
    { 
      type: 'text', 
      label: 'Descripción', 
      placeholder: 'Describa los sintomas de la alergia', 
      name: 'description', 
      required: true 
    }
  ]
  
}
