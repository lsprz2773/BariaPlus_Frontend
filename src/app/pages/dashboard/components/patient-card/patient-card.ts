import { Component, HostListener, Input } from '@angular/core';
import { Patient } from '../../../../core/interfaces/patient';
import { PatientService } from '../../../../core/services/patient-service';

@Component({
  selector: 'app-patient-card',
  standalone: false,
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css'
})
export class PatientCard {

  patients: Patient[] = []
  isLoading: boolean = true;

  constructor(private patientService: PatientService){
  }

  loadPatients(): void {
    this.isLoading = true;
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data.filter(p => p.statusId === 1);
        this.isLoading = false;

        console.log('Pacientes cargados: ', this.patients);
      },
      error: (error) => {
        console.error('Error al cargar pacientes', error);
        this.isLoading = false;
      }
    })
  }

  getAvatar(genderId: number): string {
    return genderId === 1 
      ? 'assets/otros/women-avatar.png'
      : 'assets/otros/men-avatar.png' 
  }
}