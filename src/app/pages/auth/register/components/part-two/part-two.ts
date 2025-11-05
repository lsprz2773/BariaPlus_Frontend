import { Component } from '@angular/core';
import {FormItem} from '../../../../../core/interfaces/form-item';

@Component({
  selector: 'app-part-two',
  standalone: false,
  templateUrl: './part-two.html',
  styleUrl: './part-two.css'
})
export class PartTwo {
  registerPartTwo: FormItem[] = [
    {
      type: 'select',
      label: 'Genero *',
      placeholder: 'Seleccione su genero',
      name: 'gender',
      required: true,
      options: ['Femenino', 'Masculino', 'Otro']
    },
    {
      type: 'text',
      label: 'Cedula profesional *',
      placeholder: 'Ingrese el numero de su cedula profesional',
      name: 'licenseNumber',
      required: true,
    },
    {
      type: 'text',
      label: 'Institucion de porvenciencia *',
      placeholder: 'Ingrese su institucion de porvenciencia *',
      name: 'sourceInstitution',
      required: true,
    },
    {
      type: 'date',
      label: 'Fecha de inicio laboral  *',
      placeholder: 'Ingrese la fecha de inicio laboral',
      name: 'employmentStartDate',
      required: true,
    },
    {
      type: 'text',
      label: 'Lugar de trabajo actual *',
      placeholder: 'Ingrese su lugar de trabajo actual',
      name: 'currentWorkPlace',
      required: true,
    }
  ]

}
