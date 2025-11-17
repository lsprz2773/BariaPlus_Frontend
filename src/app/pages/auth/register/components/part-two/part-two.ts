import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormItem} from '../../../../../core/interfaces/form-item';
import {ReusableForm} from '../../../../../shared/components/reusable-form/reusable-form';

@Component({
  selector: 'app-part-two',
  standalone: false,
  templateUrl: './part-two.html',
  styleUrl: './part-two.css'
})
export class PartTwo implements AfterViewInit {
    @Input() step: number = 2;
    @Output() register = new EventEmitter<any>();
    @Output() prevStep = new EventEmitter<void>();
    @ViewChild(ReusableForm) reusableForm!: ReusableForm;

    onRegister(){
      const stepTwoData = this.reusableForm.formData;
      this.register.emit(stepTwoData)
      console.log('PART TWO onRegister ejecutado');
    }

    onPrevStep(){
      this.prevStep.emit();
    }

  registerPartTwo: FormItem[] = [
    {
      type: 'select',
      label: 'Genero *',
      placeholder: 'Seleccione su genero',
      name: 'gender',
      required: true,
      options: ['Femenino', 'Masculino']
    },
    {
      type: 'text',
      label: 'Cedula profesional *',
      placeholder: 'Ingrese el numero de su cedula profesional',
      name: 'professionalLicense',
      required: true,
    },
    {
      type: 'text',
      label: 'Institucion de porvenciencia *',
      placeholder: 'Ingrese su institucion de porvenciencia *',
      name: 'graduationInstitution',
      required: true,
    },
    {
      type: 'date',
      label: 'Fecha de inicio laboral  *',
      placeholder: 'Ingrese la fecha de inicio laboral',
      name: 'employmentStart',
      required: true,
    },
    {
      type: 'text',
      label: 'Lugar de trabajo actual *',
      placeholder: 'Ingrese su lugar de trabajo actual',
      name: 'currentWorkplace',
      required: true,
    }
  ]

  ngAfterViewInit() {
    console.log('PartTwo ViewChild reusableForm:', this.reusableForm);
  }
}
