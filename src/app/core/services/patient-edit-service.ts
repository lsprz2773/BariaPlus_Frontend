import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient, PatientResponse } from '../interfaces/patient';
import { PatientService } from './patient-service';

@Injectable({
  providedIn: 'root'
})
export class PatientEditService {
  private patientToEditSubject = new BehaviorSubject<Patient | null>(null);
  public patientToEdit$ = this.patientToEditSubject.asObservable();

  private isEditModeSubject = new BehaviorSubject<boolean>(false);
  public isEditMode$ = this.isEditModeSubject.asObservable();

  constructor(private patientService: PatientService) {}

  // Establecer el paciente a editar
  setPatientForEdit(patient: Patient): void {
    this.patientToEditSubject.next(patient);
    this.isEditModeSubject.next(true);
  }

  // Obtener el paciente actual para edición
  getCurrentPatient(): Patient | null {
    return this.patientToEditSubject.value;
  }

  // Verificar si estamos en modo edición
  isInEditMode(): boolean {
    return this.isEditModeSubject.value;
  }

  // Limpiar el estado de edición
  clearEditState(): void {
    this.patientToEditSubject.next(null);
    this.isEditModeSubject.next(false);
  }

  // Actualizar paciente usando el PatientService
  updatePatient(id: number, patient: Patient): Observable<PatientResponse> {
    return this.patientService.editPatient(id, patient);
  }

  // Obtener paciente por ID para establecer datos de edición
  loadPatientForEdit(patientId: number): void {
    this.patientService.getPatientById(patientId).subscribe({
      next: (response: PatientResponse) => {
        if (response.patient) {
          this.setPatientForEdit(response.patient);
        }
      },
      error: (error) => {
        console.error('Error al cargar paciente para edición:', error);
      }
    });
  }
}