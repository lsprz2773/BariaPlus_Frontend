import { Component, HostListener, Input } from '@angular/core';
import { Patient } from '../../../../core/interfaces/patient';
import { PatientService } from '../../../../core/services/patient-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-card',
  standalone: false,
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css'
})
export class PatientCard {

  patients: Patient[] = []
  isLoading: boolean = true;

  constructor(private patientService: PatientService, private router: Router) {
  }

  @Input() patient!: Patient

  menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation(); // Evita que el click se propague
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.menuOpen = false;
  }

  onEdit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Editar');
    this.menuOpen = false;
  }

  onDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Eliminar');
    this.menuOpen = false;
  }

  loadPatients(): void {
    this.isLoading = true;
    this.patientService.getPatients().subscribe({
      next: (data) => {
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
    if (genderId === 1) {
      return 'assets/otros/men-avatar.png';
    } else {
      return 'assets/otros/women-avatar.png';
    }
  }

  // getPatientAge(): number {
  //   if (!this.patient.dateOfBirth) return 0;
  //   const birthDate = new Date(this.patient.dateOfBirth);
  //   const today = new Date();
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }

  // getGenderLabel(): string {
  //   return this.patient.genderId === 1 ? 'Masculino' : 'Femenino';
  // }

  viewPatientDetails(): void {
    this.router.navigate(['/patient', this.patient.id]);
  }
}