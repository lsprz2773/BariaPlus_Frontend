import { Component } from '@angular/core';
import { InfoItem } from '../../core/interfaces/info-item';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {

  personalInfo: InfoItem[] = [];
  profesionalInfo: InfoItem[] = [];

  ngOnInit(){
    this.personalInfo = [
      // aca se puede cambiar el value cuando se tenga la interfaz de doctor
      {label: 'Nombre(s)', value: 'Luis Ángel'},
      {label: 'Apellido(s)', value: 'Pérez Aguilera'},
      {label: 'Género', value: 'Masculino'},
      {label: 'Correo electrónico', value: 'correolargo@gmail.com'}
    ];

    this.profesionalInfo = [
      {label: 'Institución de proveniencia', value: 'Universidad Politécnica de Chiapas'},
      {label: 'Fecha de Inicio laboral', value: '15/10/2025'},
      {label: 'Número de cédula profesional', value: '123456789'},
      {label: 'Lugar actual de trabajo', value: 'Clinica Santa Rosa'}
    ];
  }

}
