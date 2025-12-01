import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormItem } from '../../core/interfaces/form-item';
import { PatientService } from '../../core/services/patient-service';
import { PatientEditService } from '../../core/services/patient-edit-service';
import { Router } from '@angular/router';
import { Patient } from '../../core/interfaces/patient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.css',
})
export class PatientRegister implements OnInit, OnDestroy {

  currentStep: number = 1;
  totalSteps: number = 4;
  isSubmitted: boolean = false;

  // Modo edición
  isEditMode: boolean = false;
  editingPatient: Patient | null = null;
  private editSubscription?: Subscription;

  // FormGroup principal (PADRE)
  patientForm!: FormGroup;

  // Propiedades para el modal
  showModal = false;
  modalType: 'success' | 'warning' | 'error' | 'info' | 'confirm' = 'success';
  modalTitle = '';
  modalMessage = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private patientEditService: PatientEditService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Verificar si estamos en modo edición
    this.editSubscription = this.patientEditService.patientToEdit$.subscribe(patient => {
      if (patient) {
        this.isEditMode = true;
        this.editingPatient = patient;
        this.loadPatientDataIntoForm(patient);
      } else {
        this.isEditMode = false;
        this.editingPatient = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
    // Limpiar estado al salir
    this.patientEditService.clearEditState();
  }

  // inicializar TODOS los controles en un solo FormGroup
  initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      genderId: ['', Validators.required],
      emergencyNumber: ['', Validators.required],

      allergies: this.fb.array([this.createAllergyGroup()]),
      diseases: this.fb.array([this.createDiseaseGroup()]),
      medicalHistories: this.fb.array([this.createMedicalHistoryGroup()])
    });
  }

  loadPatientDataIntoForm(patient: Patient): void {
    // Mapeos inversos
    const genderReverseMap: { [key: number]: string } = {
      1: 'Masculino',
      2: 'Femenino'
    };

    const stateReverseMap: { [key: number]: string } = {
      1: 'Controlada',
      2: 'En tratamiento',
      3: 'Aguda'
    };

    const historyTypeReverseMap: { [key: number]: string } = {
      1: 'Heredorfamiliares',
      2: 'Patológicos',
      3: 'No patológicos',
      4: 'Ginecobstétricos',
      5: 'Tratamientos de obesidad',
      6: 'Psicológico/Social'
    };

    // Cargar datos básicos
    this.patientForm.patchValue({
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      dateOfBirth: patient.dateOfBirth || '',
      genderId: genderReverseMap[patient.genderId || 1] || 'Masculino',
      emergencyNumber: patient.emergencyNumber || ''
    });

    // Limpiar arrays existentes
    this.clearFormArray(this.allergies);
    this.clearFormArray(this.diseases);
    this.clearFormArray(this.medicalHistories);

    // Cargar alergias
    if (patient.allergies && patient.allergies.length > 0) {
      patient.allergies.forEach(allergy => {
        this.allergies.push(this.fb.group({
          name: [allergy.name || '', Validators.required],
          allergicReaction: [allergy.allergicReaction || '', Validators.required]
        }));
      });
    } else {
      this.allergies.push(this.createAllergyGroup());
    }

    // Cargar enfermedades
    if (patient.diseases && patient.diseases.length > 0) {
      patient.diseases.forEach(disease => {
        this.diseases.push(this.fb.group({
          name: [disease.name || '', Validators.required],
          actualStateId: [stateReverseMap[disease.actualStateId || 1] || 'Controlada', Validators.required]
        }));
      });
    } else {
      this.diseases.push(this.createDiseaseGroup());
    }

    // Cargar antecedentes médicos
    if (patient.medicalHistories && patient.medicalHistories.length > 0) {
      patient.medicalHistories.forEach(history => {
        this.medicalHistories.push(this.fb.group({
          historyTypeId: [historyTypeReverseMap[history.historyTypesId || 1] || 'Heredorfamiliares', Validators.required],
          name: [history.name || '', Validators.required],
          detectionDate: [history.detectionDate || '', Validators.required]
        }));
      });
    } else {
      this.medicalHistories.push(this.createMedicalHistoryGroup());
    }
  }

  clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  //agregar con el botoncito uno por uno waaa noo
  createAllergyGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      allergicReaction: ['', Validators.required]
    });
  }
  addAllergy(): void {
    this.allergies.push(this.createAllergyGroup())
  }
  removeAllergy(index: number): void {
    if (this.allergies.length > 1) {
      this.allergies.removeAt(index);
    } else {
      this.showWarningModal('Error', 'Debe haber al menos una alergia registrada');
    }
  }

  createDiseaseGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      actualStateId: ['', Validators.required]
    })
  }
  addDisease(): void {
    this.diseases.push(this.createDiseaseGroup())
  }
  removeDisease(index: number): void {
    if (this.diseases.length > 1) {
      this.diseases.removeAt(index);
    } else {
      this.showWarningModal('Error', 'Debe haber al menos una enfermedad registrada');
    }
  }
  createMedicalHistoryGroup(): FormGroup {
    return this.fb.group({
      historyTypeId: ['', Validators.required],
      name: ['', Validators.required],
      detectionDate: ['', Validators.required]
    });
  }
  addMedicalHistory(): void {
    this.medicalHistories.push(this.createMedicalHistoryGroup());
  }
  removeMedicalHistory(index: number): void {
    if (this.medicalHistories.length > 1) {
      this.medicalHistories.removeAt(index);
    } else {
      this.showWarningModal('Error', 'Debe haber al menos un antecedente registrado');
    }
  }

  // getters para acceder a los sub-grupos en forma de arreglo
  get allergies(): FormArray {
    return this.patientForm.get('allergies') as FormArray;
  }

  get diseases(): FormArray {
    return this.patientForm.get('diseases') as FormArray;
  }

  get medicalHistories(): FormArray {
    return this.patientForm.get('medicalHistories') as FormArray;
  }

  // define qué campos mostrar en cada paso
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
    { type: 'select', label: 'Tipo de antecedente', placeholder: 'Tipo de antecedente', name: 'historyTypeId', options: ['Heredorfamiliares', 'Patológicos', 'No patológicos', 'Ginecobstétricos', 'Tratamientos de obesidad', 'Psicológico/Social'], required: true },
    { type: 'text', placeholder: 'Nombre del antecedente', name: 'name', required: true },
    { type: 'date', label: 'Fecha de detección', placeholder: 'Fecha de detección', name: 'detectionDate', required: true }
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

  // Enviar datos (el padre lee del FormGroup)
  submitAllData(): void {
    if (this.patientForm.invalid) {
      this.showWarningModal('Formulario incompleto', 'Por favor, completa todos los campos requeridos.');
      return;
    }

    this.isSubmitted = true;
    const formValue = this.patientForm.value;

    // mapeos
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

    const patientData: Patient = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dateOfBirth: formValue.dateOfBirth,
      entryDate: this.isEditMode && this.editingPatient?.entryDate 
        ? this.editingPatient.entryDate 
        : new Date().toISOString().split('T')[0],
      emergencyNumber: String(formValue.emergencyNumber),
      genderId: genderMap[formValue.genderId] || 1,
      statusId: this.isEditMode && this.editingPatient?.statusId 
        ? this.editingPatient.statusId 
        : 1,

      allergies: formValue.allergies.map((allergy: any) => ({
        name: allergy.name || null,
        allergicReaction: allergy.allergicReaction || null
      })),

      diseases: formValue.diseases.map((disease: any) => ({
        name: disease.name || null,
        actualStateId: stateMap[disease.actualStateId] || 1
      })),

      medicalHistories: formValue.medicalHistories.map((history: any) => ({
        name: history.name || null,
        detectionDate: history.detectionDate || null,
        historyTypesId: historyTypeMap[history.historyTypeId] || 1
      }))
    };

    if (this.isEditMode && this.editingPatient?.id) {
      // Modo edición
      this.patientEditService.updatePatient(this.editingPatient.id, patientData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccessModal(
              '¡Paciente actualizado!', 
              `Los datos de ${response.patient.firstName} ${response.patient.lastName} han sido actualizados correctamente.`
            );
          }
          this.isSubmitted = false;
        },
        error: (error) => {
          console.error('Error al actualizar paciente:', error);
          this.isSubmitted = false;
          this.showErrorModal(
            'Error al actualizar paciente', 
            error.error?.message || error.message || 'Error desconocido'
          );
        }
      });
    } else {
      // Modo creación
      this.patientService.createPatient(patientData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccessModal(
              '¡Paciente creado!',
              `El paciente ${response.patient.firstName} ${response.patient.lastName} ha sido registrado exitosamente.`
            );
          }
          this.isSubmitted = false;
        },
        error: (error) => {
          console.error('Error al crear paciente:', error);
          this.isSubmitted = false;
          this.showErrorModal(
            'Error al crear paciente',
            error.error?.message || error.message || 'Error desconocido'
          );
        }
      });
    }
  }

  // Métodos para manejar modales
  showSuccessModal(title: string, message: string): void {
    this.modalType = 'success';
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  showErrorModal(title: string, message: string): void {
    this.modalType = 'error';
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  showWarningModal(title: string, message: string): void {
    this.modalType = 'warning';
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  handleModalConfirm(): void {
    if (this.modalType === 'success') {
      // Navegar según el modo
      if (this.isEditMode && this.editingPatient?.id) {
        this.router.navigate(['/patient', this.editingPatient.id]);
      } else {
        this.patientForm.reset();
        this.initForm();
        this.currentStep = 1;
        this.router.navigate(['/dashboard']);
      }
      this.patientEditService.clearEditState();
    }
    this.closeModal();
  }

  handleModalCancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
  }
}