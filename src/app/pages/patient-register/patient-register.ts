import { Component } from '@angular/core';
import { FormItem } from '../../core/interfaces/form-item';
import { PatientService } from '../../core/services/patient-service';
import { Router } from '@angular/router';
import { Allergy } from '../../core/interfaces/allergy';
import { Disease } from '../../core/interfaces/diseases';
import { MedicalHistory } from '../../core/interfaces/medical-history';
import { Patient } from '../../core/interfaces/patient';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.css'
})
export class PatientRegister {

  currentStep: number = 1;
  totalSteps: number = 4;
  isSubmitted: boolean = false;

  constructor(
    private patientService: PatientService,
    private router: Router
  ) { }

  //informacionpersonal
  personalInfo: FormItem[] = [
    {
      type: 'text',
      placeholder: 'Nombre',
      name: 'firstName',
      required: true
    },
    {
      type: 'text',
      placeholder: 'Apellidos',
      name: 'lastName',
      required: true
    },
    {
      type: 'date',
      placeholder: 'Fecha de nacimiento',
      name: 'dateOfBirth',
      required: true
    },
    {
      type: 'select',
      placeholder: 'Sexo',
      name: 'genderId',
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
      name: 'name',
      required: true
    },
    {
      type: 'text',
      placeholder: 'Describa los sintomas de la alergia',
      name: 'allergicReaction',
      required: true
    }
  ]

  diseases: FormItem[] = [
    {
      type: 'text',
      placeholder: 'Nombre de la enfermedad',
      name: 'name',
      required: true
    },
    {
      type: 'select',
      label: "Estado actual",
      placeholder: 'Estado actual',
      name: 'actualStateId', //preguntar xd 
      options: ['Controlada', 'En tratamiento', 'Aguda'],
      required: true
    }
  ]

  medicalHistories: FormItem[] = [
    {
      type: 'select',
      placeholder: 'Tipo de antecedente',
      name: 'historyTypeId',
      options: ['Heredorfamiliares', 'Patológicos', 'No patológicos', 'Ginecobstétricos', 'Tratamientos de obesidad', 'Psicológico/Social'],
      required: true
    },
    {
      type: 'text',
      placeholder: 'Nombre del antecedente',
      name: 'name',
      required: true
    },
    {
      type: 'date',
      placeholder: 'Fecha de detección',
      name: 'detectionDate',
      required: true
    }
  ];

  //almacenar los datos
  formData = {
    personal: {} as any,
    allergies: {} as Allergy[],
    diseases: {} as Disease[],
    medicalHistories: {} as MedicalHistory[]
  };

  //pasos del steppler
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      console.log('Paso actual:', this.currentStep);
    }
  }
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }
  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  // guardar formulario
  onFormSubmit(stepData: any) {
    switch (this.currentStep) {
      case 1:
        if (stepData.genderId == 'Masculino') {
          stepData.genderId = 1;
        } else if (stepData.genderId == 'Femenino') {
          stepData.genderId = 2;
        }
        this.formData.personal.push(stepData);
        break;
      case 2:
        this.formData.allergies.push({
          name: stepData.name,
          allergicReaction: stepData.allergicReaction
        })
        break;
      case 3:
        // mapear el id para convertir el id de string a number
        const stateMap: { [key: string]: number } = {
          'Controlada': 1,
          'En tratamiento': 2,
          'Aguda': 3
        };

        this.formData.diseases.push({
          name: stepData.name,
          actualStateId: stateMap[stepData.actualStateId] || 1
        })
        break;
      case 4:
        const historyTypeMap: { [key: string]: number } = {
          'Heredofamiliares': 1,
          'Patológicos': 2,
          'No patológicos': 3,
          'Ginecobstétricos': 4,
          'Tratamientos de obesidad': 5,
          'Psicológico/Social': 6
        };

        this.formData.medicalHistories.push({
          name: stepData.name,
          detectionDate: stepData.detectionDate || null,
          historyTypesId: historyTypeMap[stepData.historyTypeId] || 1,
        });

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
    this.isSubmitted = true;

    const patientData: Patient = {
      firstName: this.formData.personal.firstName,
      lastName: this.formData.personal.lastName,
      dateOfBirth: this.formData.personal.dateOfBirth,
      emergencyNumber: this.formData.personal.emergencyNumber,
      genderId: this.formData.personal.genderId,
      statusId: 1, // Activo por defecto
      allergies: this.formData.allergies,
      diseases: this.formData.diseases,
      medicalHistories: this.formData.medicalHistories
    };

    console.log('Todos los datos del paciente:', patientData);

    this.patientService.createPatient(patientData).subscribe({
      next: (response) => {
        console.log('Paciente creado exitosamente', response);
        alert('Paciente registrado exitosamente');
        this.isSubmitted = false;

        // this.router.navigate['/aca va la vista del paciente con las card']
      },
      error: (error) => {
        console.error('Error al crear paciente', error);
        alert('Hubo un error al crear el paciente. Por favor, intente de nuevo')
        this.isSubmitted = false;
      }
    });
  }
}
