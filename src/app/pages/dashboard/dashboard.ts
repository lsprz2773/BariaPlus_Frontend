import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient } from '../../core/interfaces/patient';
import { PatientService } from '../../core/services/patient-service';
import { PatienFilterService } from '../../core/services/patien-filter-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(private patientService: PatientService,
    private filterService: PatienFilterService
  ) { }

  ngOnInit(): void {
    this.loadPatients();

    this.filterService.filteredPatients$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filteredPatients => {
        this.filteredPatients = filteredPatients;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.patientService.getPatients().subscribe({
      next: (response) => {
        if (response.success) {
          // Ajusta según respuesta de API - puede ser response.patients o response.data
          this.patients = response.patients || [];
          this.filterService.setPatients(this.patients);

          this.isLoading = false;
          console.log('Pacientes cargados:', this.patients);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
        this.errorMessage = 'No se pudieron cargar los pacientes. Intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  onPatientDeleted(patientId: number): void {
    this.patients = this.patients.filter(p => p.id !== patientId);
    this.filteredPatients = this.filteredPatients.filter(p => p.id !== patientId);
  }

  //cachar solo el id del paciente y no meterme en más pedo con eliminar XD
  trackByPatientId(index: number, patient: Patient): number {
    return patient.id || index;
  }

  refreshPatients(): void {
    this.loadPatients();
  }
}
