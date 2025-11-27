import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultationService } from '../../core/services/consultation-service';
import { ConsultationRequest, MetricValue } from '../../core/interfaces/consultation';
import { FormItem } from '../../core/interfaces/form-item';
import { ConsultationStateService } from '../../core/services/consultation-state-service';

@Component({
  selector: 'app-anthropometric-measurements',
  standalone: false,
  templateUrl: './anthropometric-measurements.html',
  styleUrl: './anthropometric-measurements.css'
})
export class AnthropometricMeasurements implements OnInit {

  currentStep: number = 1;
  totalSteps: number = 3;
  isSubmitted: boolean = false;

  measurementsForm!: FormGroup;
  patientId: number = 0;
  medicalRecordId: number = 0;

  // talla, peso actual, gasto energético, circunferencias
  step1Fields: FormItem[] = [
    { id: 1, type: 'number', placeholder: 'Peso actual en kg', name: 'peso', required: true, step: '0.1', min: 0 },
    { id: 2, type: 'number', placeholder: 'Talla en cm', name: 'talla', required: true, step: '0.1', min: 0 },
    { id: 0, type: 'select', label: 'Gasto energético', placeholder: 'Nivel de actividad física', name: 'physicalActivityId', options: ['Sedentario', 'Ligero', 'Moderado', 'Intenso', 'Muy intenso'], required: true },
    { id: 0, type: 'number', label: 'Porcentaje de reducción', placeholder: 'Porcentaje (%)', name: 'reductionPercentage', step: '1', min: 0, max: 100, required: false },
    { id: 6, type: 'number', placeholder: 'Cintura (cm)', name: 'cintura', step: '0.1', min: 0 },
    { id: 7, type: 'number', placeholder: 'Cadera (cm)', name: 'cadera', step: '0.1', min: 0 },
    { id: 8, type: 'number', placeholder: 'Muñeca (cm)', name: 'muneca', step: '0.1', min: 0 },
    { id: 9, type: 'number', placeholder: 'Brazo relajado (cm)', name: 'brazoRelajado', step: '0.1', min: 0 },
    { id: 10, type: 'number', placeholder: 'Cuello (cm)', name: 'cuello', step: '0.1', min: 0 },
    { id: 11, type: 'number', placeholder: 'Muslo (cm)', name: 'muslo', step: '0.1', min: 0 },
    { id: 12, type: 'number', placeholder: 'En contracción (cm)', name: 'contraido', step: '0.1', min: 0 },
  ];

  // pliegues cutáneos
  step2Fields: FormItem[] = [
    { id: 13, type: 'number', placeholder: 'Bíceps (mm)', name: 'biceps', step: '0.1', min: 0 },
    { id: 14, type: 'number', placeholder: 'Tríceps (mm)', name: 'triceps', step: '0.1', min: 0 },
    { id: 15, type: 'number', placeholder: 'Subescapular (mm)', name: 'subescapular', step: '0.1', min: 0 },
    { id: 16, type: 'number', placeholder: 'Ileocrestal (mm)', name: 'ileocrestal', step: '0.1', min: 0 },
    { id: 17, type: 'number', placeholder: 'Suprailíaco (mm)', name: 'suprailiaco', step: '0.1', min: 0 },
    { id: 18, type: 'number', placeholder: 'Abdominal (mm)', name: 'abdominal', step: '0.1', min: 0 },
    { id: 19, type: 'number', placeholder: 'Axila medial (mm)', name: 'axilaMedial', step: '0.1', min: 0 },
    { id: 20, type: 'number', placeholder: 'Pectoral (mm)', name: 'pectoral', step: '0.1', min: 0 },
  ];

  // bioimpedancia
  step3Fields: FormItem[] = [
    { id: 22, type: 'number', placeholder: 'Porcentaje de grasa corporal (%)', name: 'porcentajeGrasaCorporal', step: '0.1', min: 0 },
    { id: 23, type: 'number', placeholder: 'Kg de músculo', name: 'kgMusculo', step: '0.1', min: 0 },
    { id: 24, type: 'number', placeholder: 'Kg masa ósea', name: 'kgMasaOsea', step: '0.1', min: 0 },
    { id: 25, type: 'number', placeholder: 'Porcentaje de agua corporal (%)', name: 'porcentajeAguaCorporal', step: '0.1', min: 0 },
    { id: 26, type: 'number', placeholder: 'Ingesta diaria en calorías', name: 'ingestaCaloriaDiaria', step: '1', min: 0 },
    { id: 27, type: 'number', placeholder: 'Edad metabólica', name: 'edadMetabolica', step: '1', min: 0 },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private consultationStateService: ConsultationStateService,
    private consultationService: ConsultationService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId')) || 0;
      this.medicalRecordId = Number(this.route.snapshot.queryParamMap.get('medicalRecordId')) || 0;

    })

    this.initForm();
  }

  initForm(): void {
    const formConfig: any = {};

    [...this.step1Fields, ...this.step2Fields, ...this.step3Fields].forEach(field => {
      const validators = field.required ? [Validators.required, Validators.min(field.min || 0)] : [Validators.min(field.min || 0)];
      formConfig[field.name] = ['', validators];
    });

    this.measurementsForm = this.fb.group(formConfig);
  }


  // ver en donde esta y traer los campos de cada form
  getCurrentStepFields(): FormItem[] {
    switch (this.currentStep) {
      case 1: return this.step1Fields;
      case 2: return this.step2Fields;
      case 3: return this.step3Fields;
      default: return [];
    }
  }

  nextStep(): void {
    const currentFields = this.getCurrentStepFields();
    const hasErrors = currentFields.some(field =>
      this.measurementsForm.get(field.name)?.invalid
    );

    if (hasErrors) {
      currentFields.forEach(field => {
        this.measurementsForm.get(field.name)?.markAsTouched();
      });
      return;
    }

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

  submitAllData(): void {
    console.log('🔍 Form valid:', this.measurementsForm.valid);
    console.log('🔍 Form values:', this.measurementsForm.value);
    console.log('🔍 Patient ID:', this.patientId);
    console.log('🔍 Medical Record ID:', this.medicalRecordId);

    // ✅ Validar que los IDs no sean 0
    if (this.patientId === 0 || this.medicalRecordId === 0) {
      alert('❌ Error: IDs de paciente o historial médico no válidos');
      console.error('❌ IDs inválidos:', {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId
      });
      return;
    }

    if (this.measurementsForm.invalid) {
      alert('⚠️ Por favor completa todos los campos requeridos');
      this.measurementsForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    const formValues = this.measurementsForm.value;
    
    // ✅ Construir metricValues (SOLO enviar valores que NO estén vacíos)
    const metricValues: MetricValue[] = [];
    [...this.step1Fields, ...this.step2Fields, ...this.step3Fields].forEach(field => {
      if (field.id && field.id > 0) {
        const value = formValues[field.name];
        // ✅ Solo agregar si tiene valor
        if (value !== null && value !== '' && value !== undefined && value !== 0) {
          metricValues.push({
            metricsCatalogId: field.id,
            value: value.toString()
          });
        }
      }
    });

    console.log('📊 Metric values construidas:', metricValues);

    // ✅ Validar que physicalActivityId exista
    if (!formValues.physicalActivityId) {
      alert('⚠️ Selecciona un nivel de actividad física');
      this.isSubmitted = false;
      return;
    }

    // ✅ Validar que reductionPercentage exista
    if (!formValues.reductionPercentage && formValues.reductionPercentage !== 0) {
      alert('⚠️ Ingresa el porcentaje de reducción calórica');
      this.isSubmitted = false;
      return;
    }

    // ✅ Mapear actividad física
    const activityMap: { [key: string]: number } = {
      'Sedentario': 1,
      'Ligero': 2,
      'Moderado': 3,
      'Intenso': 4,
      'Muy intenso': 5
    };

    const physicalActivityId = activityMap[formValues.physicalActivityId];
    
    if (!physicalActivityId) {
      alert('❌ Nivel de actividad física inválido');
      console.error('❌ physicalActivityId no mapeado:', formValues.physicalActivityId);
      this.isSubmitted = false;
      return;
    }

    // ✅ Obtener notas del state service
    const notes = this.consultationStateService.getNotes();
    console.log('📝 Notas obtenidas:', notes);

    // ✅ Construir request completo
    const consultationData: ConsultationRequest = {
      patientId: this.patientId,
      medicalRecordId: this.medicalRecordId,
      reason: 'Evaluación del paciente',
      notes: notes,
      metricValues: metricValues,
      energeticExpenditure: {
        physicalActivityId: physicalActivityId,
        reductionPercentage: formValues.reductionPercentage.toString()
      }
    };

    console.log('📤 REQUEST COMPLETO A ENVIAR:', JSON.stringify(consultationData, null, 2));

    // ✅ Enviar a la API
    this.consultationService.createConsultation(consultationData).subscribe({
      next: (response) => {
        console.log('✅ RESPUESTA EXITOSA:', response);
        alert('✅ Mediciones guardadas exitosamente');
        
        // ✅ Limpiar estado
        this.consultationStateService.clearAllConsultationData();
        
        // ✅ Navegar de vuelta
        this.router.navigate(['/patient', this.patientId]);
      },
      error: (error) => {
        console.error('❌ ERROR COMPLETO:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error message:', error.error);
        
        let errorMessage = '❌ Error al guardar las mediciones';
        
        if (error.error?.message) {
          errorMessage += ': ' + error.error.message;
        } else if (error.message) {
          errorMessage += ': ' + error.message;
        }
        
        alert(errorMessage);
        this.isSubmitted = false;
      }
    });
  }
}
