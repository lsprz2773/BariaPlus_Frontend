import { Component } from '@angular/core';
import { FormItem } from '../../core/interfaces/form-item';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.css'
})
export class PatientRegister {

  currentStep:number = 1;
  totalSteps: number = 4;

  //informacionpersonal
  personalInfo: FormItem[] = [
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
      label: "Estado actual",
      placeholder: 'Estado actual', 
      name: 'actual_state', //preguntar xd 
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

  formData = {
    personal: {},
    allergie: {},
    ill: {},
    record:{}
  }

  // gracias claude por,todavia en mantenimiento XD 

   // Avanzar al siguiente paso
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      console.log('Paso actual:', this.currentStep);
    }
  }

  // Retroceder al paso anterior
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Verificar si es el último paso
  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  // Verificar si es el primer paso
  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  // Guardar datos del formulario actual
  onFormSubmit(stepData: any) {
    switch(this.currentStep) {
      case 1:
        this.formData.personal = stepData;
        break;
      case 2:
        this.formData.allergie = stepData;
        break;
      case 3:
        this.formData.ill = stepData;
        break;
      case 4:
        this.formData.record = stepData;
        break;
    }
    
    if (this.isLastStep()) {
      this.submitAllData();
    } else {
      this.nextStep();
    }
  }
  
  // Enviar todos los datos
  submitAllData() {
    console.log('Todos los datos del paciente:', this.formData);
    // Aquí llamarías a tu servicio para guardar en el backend
  }
  
}
