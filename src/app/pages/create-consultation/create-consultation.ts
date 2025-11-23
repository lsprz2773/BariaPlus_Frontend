import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ConsultationService } from '../../core/services/consultation-service';
import { CreateConsultationRequest } from '../../core/interfaces/consultation';
import { 
  METRICS_CATALOG, 
  PHYSICAL_ACTIVITIES, 
  NOTE_CATEGORIES,
  getMetricById,
  getIndicatorById 
} from '../../core/constants/metrics-catalog';

@Component({
  selector: 'app-create-consultation',
  templateUrl: './create-consultation.html',
  styleUrls: ['./create-consultation.css']
})
export class CreateConsultation implements OnInit {

  consultationForm!: FormGroup;
  metricsCatalog = METRICS_CATALOG;
  physicalActivities = PHYSICAL_ACTIVITIES;
  noteCategories = NOTE_CATEGORIES;
  
  isSubmitting = false;
  errorMessage = '';
  
  // Resultados calculados
  calculatedIndicators: any[] = [];
  calculatedMetrics: any[] = [];

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.consultationForm = this.fb.group({
      patientId: [null, Validators.required],
      medicalRecordId: [null, Validators.required],
      reason: ['', Validators.required],
      
      // Notas clínicas
      notes: this.fb.array([
        this.createNoteFormGroup()
      ]),
      
      // Valores de métricas
      metricValues: this.fb.array([]),
      
      // Gasto energético
      energeticExpenditure: this.fb.group({
        physicalActivityId: [1, Validators.required],
        reductionPercentage: ['15', Validators.required]
      })
    });

    // Inicializar métricas (solo las que no son calculadas)
    this.initializeMetrics();
  }

  createNoteFormGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      categoryId: [1, Validators.required]
    });
  }

  createMetricFormGroup(metricsCatalogId: number): FormGroup {
    return this.fb.group({
      metricsCatalogId: [metricsCatalogId, Validators.required],
      value: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]]
    });
  }

  initializeMetrics(): void {
    const metricsArray = this.consultationForm.get('metricValues') as FormArray;
    
    // Solo agregar métricas que NO son calculadas
    const inputMetrics = METRICS_CATALOG.filter(m => m.category !== 'calculated');
    
    inputMetrics.forEach(metric => {
      metricsArray.push(this.createMetricFormGroup(metric.id));
    });
  }

  get notes(): FormArray {
    return this.consultationForm.get('notes') as FormArray;
  }

  get metricValues(): FormArray {
    return this.consultationForm.get('metricValues') as FormArray;
  }

  addNote(): void {
    this.notes.push(this.createNoteFormGroup());
  }

  removeNote(index: number): void {
    if (this.notes.length > 1) {
      this.notes.removeAt(index);
    }
  }

  getMetricName(catalogId: number): string {
    const metric = getMetricById(catalogId);
    return metric ? `${metric.name} (${metric.unit})` : 'Métrica desconocida';
  }

  onSubmit(): void {
    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos requeridos';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const consultationData: CreateConsultationRequest = this.consultationForm.value;

    console.log('📤 Enviando consulta:', consultationData);

    this.consultationService.createConsultation(consultationData).subscribe({
      next: (response) => {
        console.log('✅ Consulta creada:', response);
        
        // Guardar indicadores y métricas calculadas
        this.calculatedIndicators = response.calculatedIndicators;
        this.calculatedMetrics = response.calculatedMetrics;
        
        this.displayResults(response);
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('❌ Error al crear consulta:', error);
        this.errorMessage = 'Error al crear la consulta. Intenta de nuevo.';
        this.isSubmitting = false;
      }
    });
  }

  displayResults(response: any): void {
    console.log('📊 Resultados calculados:');
    
    // Mostrar indicadores de salud
    response.calculatedIndicators.forEach((indicator: any) => {
      const type = getIndicatorById(indicator.typeIndicatorId);
      console.log(`${type?.name}: ${indicator.value} ${type?.unit} - ${indicator.rangeName}`);
    });
    
    // Mostrar métricas calculadas
    response.calculatedMetrics.forEach((metric: any) => {
      const catalog = getMetricById(metric.catalogId);
      console.log(`${catalog?.name}: ${metric.value} ${catalog?.unit}`);
    });
    
    // Aquí podrías mostrar un modal con los resultados
    // o navegar a una página de detalle de la consulta
  }

  getIndicatorColor(indicator: any): string {
    return indicator.color || '#9E9E9E';
  }

  getIndicatorName(typeIndicatorId: number): string {
    const indicator = getIndicatorById(typeIndicatorId);
    return indicator?.name || 'Indicador desconocido';
  }
}
