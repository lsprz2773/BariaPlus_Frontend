import { Component, Input } from '@angular/core';
import { FormItem } from '../../../core/interfaces/form-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reusable-form',
  standalone: false,
  templateUrl: './reusable-form.html',
  styleUrl: './reusable-form.css'
})
export class ReusableForm {

  @Input() title: string = '';

  formItems: FormItem[] = [
    //informacion personal
    { type: 'text', label: 'Nombre', placeholder: 'Nombre', name: 'name', required: true },
    { type: 'text', label: 'Apellidos', placeholder: 'Apellidos', name: 'lastname', required: true },
    { type: 'date', label: 'Fecha de nacimiento', placeholder: 'Fecha de nacimiento', name: 'birthdate', required: true },
    { type: 'select', label: 'Sexo', placeholder: '', name: 'Sexo', options: ['Masculino', 'Femenino'], required: true },
    { type: 'tel', label: 'Número de emergencia', placeholder: 'Número de emergencia', name: 'emergencyNumber', required: true }
  ];

  // almacenar los valores del formulario
  formData = {
    name: '',
    lastname: '',
    birthdate: '',
    gender: '',
    emergencyNumber: ''
  };

}
