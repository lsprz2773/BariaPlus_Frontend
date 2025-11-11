import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormItem} from '../../../../../core/interfaces/form-item';

@Component({
  selector: 'app-part-one',
  standalone: false,
  templateUrl: './part-one.html',
  styleUrl: './part-one.css'
})
export class PartOne {
  @Input() step: number = 1;
  @Output() nextStep = new EventEmitter<void>();

  onNextStep(){
    this.nextStep.emit();
  }


  registerPartOne: FormItem[] = [
    {
      type: 'text',
      label: 'Nombre (s) *',
      placeholder: 'Ingrese su nombre',
      name: 'name',
      required: true,
    },
    {
      type: 'text',
      label: 'Apellido (s) *',
      placeholder: 'Ingrese sus apellidos',
      name: 'lastName',
      required: true,
    },
    {
      type: 'email',
      label: 'Email @ *',
      placeholder: 'Ingrese su correo electronico. Ej: correo@gmail.com',
      name: 'email',
      required: true,
    },
    {
      type: 'password',
      label: 'Contraseña *',
      placeholder: 'Minimo 8 caracteres',
      name: 'password',
      required: true,
    },
    {
      type: 'password',
      label: 'Confirme su contraseña *',
      placeholder: 'Minimo 8 caracteres',
      name: 'checkPassword',
      required: true,
    }
  ]
}
