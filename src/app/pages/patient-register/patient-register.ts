import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormItem } from '../../core/interfaces/form-item';
import { PatientService } from '../../core/services/patient-service';
import { Router } from '@angular/router';
import { Patient } from '../../core/interfaces/patient';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.css',
})
export class PatientRegister implements OnInit {

  currentStep: number = 1;
  totalSteps: number = 4;
  isSubmitted: boolean = false;
  
  // ✅ FormGroup principal (PADRE)
  patientForm!: FormGroup;
  allergiesForm!: FormGroup;
  diseasesForm!: FormGroup;
  medicalHistoriesForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // ✅ Inicializar TODOS los controles en un solo FormGroup
  initForm(): void {
    this.patientForm = this.fb.group({
      // Paso 1: Información Personal (controles individuales)
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      genderId: ['', Validators.required],
      emergencyNumber: ['', Validators.required],
      
      // Paso 2: Alergias (sub-grupo para simplificar)
      allergy: this.fb.group({
        name: ['', Validators.required],
        allergicReaction: ['', Validators.required]
      }),
      
      // Paso 3: Enfermedades (sub-grupo)
      disease: this.fb.group({
        name: ['', Validators.required],
        actualStateId: ['', Validators.required]
      }),
        
      // Paso 4: Antecedentes (sub-grupo)
      medicalHistory: this.fb.group({
        historyTypeId: ['', Validators.required],
        name: ['', Validators.required],
        detectionDate: ['', Validators.required]
      })
    });
  }

  // ✅ Getters para acceder a los sub-grupos
  get allergyGroup(): FormGroup {
    return this.patientForm.get('allergy') as FormGroup;
  }

  get diseaseGroup(): FormGroup {
    return this.patientForm.get('disease') as FormGroup;
  }

  get medicalHistoryGroup(): FormGroup {
    return this.patientForm.get('medicalHistory') as FormGroup;
  }

  // ✅ Configuración de FormItems (define qué campos mostrar en cada paso)
  personalInfo: FormItem[] = [
    { type: 'text', placeholder: 'Nombre', name: 'firstName', required: true },
    { type: 'text', placeholder: 'Apellidos', name: 'lastName', required: true },
    { type: 'date', placeholder: 'Fecha de nacimiento', name: 'dateOfBirth', required: true },
    { type: 'select', placeholder: 'Sexo', name: 'genderId', options: ['Masculino', 'Femenino'], required: true },
    { type: 'tel', placeholder: 'Número de emergencia', name: 'emergencyNumber', required: true }
  ];

  allergiesItems: FormItem[] = [
    { type: 'text', placeholder: 'Nombre de la alergia', name: 'name', required: true },
    { type: 'text', placeholder: 'Describa los síntomas', name: 'allergicReaction', required: true }
  ];

  diseasesItems: FormItem[] = [
    { type: 'text', placeholder: 'Nombre de la enfermedad', name: 'name', required: true },
    { type: 'select', label: "Estado actual", placeholder: 'Estado actual', name: 'actualStateId', options: ['Controlada', 'En tratamiento', 'Aguda'], required: true }
  ];

  medicalHistoriesItems: FormItem[] = [
    { type: 'select', placeholder: 'Tipo de antecedente', name: 'historyTypeId', options: ['Heredorfamiliares', 'Patológicos', 'No patológicos', 'Ginecobstétricos', 'Tratamientos de obesidad', 'Psicológico/Social'], required: true },
    { type: 'text', placeholder: 'Nombre del antecedente', name: 'name', required: true },
    { type: 'date', placeholder: 'Fecha de detección', name: 'detectionDate', required: true }
  ];

  // Navegación
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
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

  // ✅ Enviar datos (el padre lee del FormGroup)
  submitAllData(): void {
    if (this.patientForm.invalid) {
      alert('⚠️ Por favor completa todos los campos requeridos');
      this.patientForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;

    const formValue = this.patientForm.value;

    // Mapeos
    const genderMap: { [key: string]: number } = {
      'Masculino': 1,
      'Femenino': 2
    };

    const stateMap: { [key: string]: number } = {
      'Controlada': 1,
      'En tratamiento': 2,
      'Aguda': 3
    };

    const historyTypeMap: { [key: string]: number } = {
      'Heredorfamiliares': 1,
      'Patológicos': 2,
      'No patológicos': 3,
      'Ginecobstétricos': 4,
      'Tratamientos de obesidad': 5,
      'Psicológico/Social': 6
    };

    // ✅ Construir objeto Patient con los datos del FormGroup
    const patientData: Patient = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dateOfBirth: formValue.dateOfBirth,
      emergencyNumber: formValue.emergencyNumber,
      genderId: genderMap[formValue.genderId] || 1,
      statusId: 1,
      allergies: [{
        name: formValue.allergy.name,
        allergicReaction: formValue.allergy.allergicReaction
      }],
      diseases: [{
        name: formValue.disease.name,
        actualStateId: stateMap[formValue.disease.actualStateId] || 1
      }],
      medicalHistories: [{
        name: formValue.medicalHistory.name,
        detectionDate: formValue.medicalHistory.detectionDate || null,
        historyTypesId: historyTypeMap[formValue.medicalHistory.historyTypeId] || 1
      }]
    };

    console.log('📤 Datos a enviar:', patientData);

    this.patientService.createPatient(patientData).subscribe({
      next: (response) => {
        console.log('✅ Respuesta del servidor:', response);
        if (response.success) {
          alert(`✅ ${response.message}\nPaciente: ${response.patient.firstName} ${response.patient.lastName}`);
          this.patientForm.reset();
          this.router.navigate(['/dashboard']);
        }
        this.isSubmitted = false;
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.isSubmitted = false;
        alert(`❌ Error al crear paciente: ${error.message || 'Error desconocido'}`);
      }
    });
  }
}
