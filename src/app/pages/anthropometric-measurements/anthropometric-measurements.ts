import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultationService } from '../../core/services/consultation-service';
import { ConsultationRequest, MetricValue } from '../../core/interfaces/consultation';
import { FormItem } from '../../core/interfaces/form-item';

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
    { id: 2, type: 'number', placeholder: 'Talla en cm', name: 'talla', required: true, step: '0.1', min: 0 },
    { id: 1, type: 'number', placeholder: 'Peso actual en kg', name: 'peso', required: true, step: '0.1', min: 0 },
    { id: 0, type: 'select', label: 'Gasto energético', placeholder: 'Seleccione nivel de actividad', name: 'physicalActivityId', options: ['Ligero', 'Moderado', 'Intenso', 'Muy intenso'], required: true },
    { id: 6, type: 'number', placeholder: 'Cintura (cm)', name: 'cintura', step: '0.1', min: 0 },
    { id: 7, type: 'number', placeholder: 'Cadera (cm)', name: 'cadera', step: '0.1', min: 0 },
    { id: 8, type: 'number', placeholder: 'Muñeca (cm)', name: 'muñeca', step: '0.1', min: 0 },
    { id: 9, type: 'number', placeholder: 'Brazo relajado (cm)', name: 'brazoRelajado', step: '0.1', min: 0 },
    { id: 10, type: 'number', placeholder: 'Cuello (cm)', name: 'cuello', step: '0.1', min: 0 },
    { id: 11, type: 'number', placeholder: 'Muslo (cm)', name: 'muslo', step: '0.1', min: 0 },
    { id: 12, type: 'number', placeholder: 'En contracción (cm)', name: 'contraido', step: '0.1', min: 0 }
  ];

  // paso 2: pliegues cutáneos
  step2Fields: FormItem[] = [
    { id: 13, type: 'number', placeholder: 'Bíceps (mm)', name: 'biceps', step: '0.1', min: 0 },
    { id: 14, type: 'number', placeholder: 'Tríceps (mm)', name: 'triceps', step: '0.1', min: 0 },
    { id: 15, type: 'number', placeholder: 'Subescapular (mm)', name: 'subescapular', step: '0.1', min: 0 },
    { id: 16, type: 'number', placeholder: 'Ileocrestal (mm)', name: 'ileocrestal', step: '0.1', min: 0 },
    { id: 17, type: 'number', placeholder: 'Suprailíaco (mm)', name: 'suprailiaco', step: '0.1', min: 0 },
    { id: 18, type: 'number', placeholder: 'Abdominal (mm)', name: 'abdominal', step: '0.1', min: 0 },
    { id: 19, type: 'number', placeholder: 'Axila medial (mm)', name: 'axilaMedial', step: '0.1', min: 0 },
    { id: 20, type: 'number', placeholder: 'Pectoral (mm)', name: 'pectoral', step: '0.1', min: 0 },
    { id: 22, type: 'number', placeholder: 'Muslo frontal (mm)', name: 'musloFrontal', step: '0.1', min: 0 },
    { id: 23, type: 'number', placeholder: 'Pantorrilla medial (mm)', name: 'pantorrillaMedial', step: '0.1', min: 0 }
  ];

  // bioimpedancia
  step3Fields: FormItem[] = [
    { id: 21, type: 'number', placeholder: 'Porcentaje de grasa corporal (%)', name: 'porcentajeGrasaCorporal', step: '0.1', min: 0 },
    { id: 22, type: 'number', placeholder: 'Porcentaje de masa corporal (%)', name: 'porcentajeMasaCorporal', step: '0.1', min: 0 },
    { id: 23, type: 'number', placeholder: 'Kg de músculo', name: 'kgMusculo', step: '0.1', min: 0 },
    { id: 24, type: 'number', placeholder: 'Kg masa ósea', name: 'kgMasaOsea', step: '0.1', min: 0 },
    { id: 25, type: 'number', placeholder: 'Porcentaje de agua corporal (%)', name: 'porcentajeAguaCorporal', step: '0.1', min: 0 },
    { id: 26, type: 'number', placeholder: 'Ingesta diaria en calorías', name: 'ingestaCaloriaDiaria', step: '1', min: 0 },
    { id: 27, type: 'number', placeholder: 'Edad metabólica', name: 'edadMetabolica', step: '1', min: 0 },
    { id: 28, type: 'number', placeholder: 'IMC (BMI)', name: 'imc', step: '0.1', min: 0 },
    { id: 29, type: 'number', placeholder: 'Nivel de grasa visceral', name: 'nivelGrasaVisceral', step: '1', min: 0 },
    { id: 30, type: 'number', placeholder: 'Proporción de grasa visceral (%)', name: 'proporcionGrasaVisceral', step: '0.1', min: 0 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId')) || 0;
    this.medicalRecordId = Number(this.route.snapshot.paramMap.get('medicalRecordId')) || 0;
    
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

  submitAllData(): void {
    if (this.measurementsForm.invalid) {
      alert('⚠️ Por favor completa todos los campos requeridos');
      this.measurementsForm.markAllAsTouched();
      return;
    }

    const formValues = this.measurementsForm.value;
    
    const metricValues: MetricValue[] = [];
    
    [...this.step1Fields, ...this.step2Fields, ...this.step3Fields].forEach(field => {
      if (field.id && field.id > 0) {
        const value = formValues[field.name];
        if (value !== null && value !== '' && value !== undefined) {
          metricValues.push({
            metricsCatalogId: field.id,
            value: value.toString()
          });
        }
      }
    });

    const activityMap: { [key: string]: number } = {
      'Ligero': 1,
      'Moderado': 2,
      'Intenso': 3,
      'Muy intenso': 4
    };

    const consultationData: ConsultationRequest = {
      patientId: this.patientId,
      medicalRecordId: this.medicalRecordId,
      reason: 'Evaluación antropométrica',
      notes: [],
      metricValues: metricValues,
      energeticExpenditure: {
        physicalActivityId: activityMap[formValues.physicalActivityId] || 1,
        reductionPercentage: '15'
      }
    };

    console.log('📤 Enviando consulta:', consultationData);

    this.consultationService.createConsultation(consultationData).subscribe({
      next: (response) => {
        console.log('✅ Respuesta:', response);
        alert('✅ Mediciones guardadas exitosamente');
        this.router.navigate(['/patient', this.patientId]);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        alert('❌ Error al guardar las mediciones');
      }
    });

    this.isSubmitted = true;
  }
}
