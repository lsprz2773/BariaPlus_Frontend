import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

  @Output() patientDeleted = new EventEmitter<number>();

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
    this.menuOpen = false;

    

    if (this.patient.id !== undefined) {
      this.patientService.deletePatient(this.patient.id).subscribe({
        next: () => {
          console.log('Paciente eliminado');
          this.loadPatients();

          this.patientDeleted.emit(this.patient.id);
        },
        error: (error) => {
          console.error('Error al eliminar paciente', error);
        }
      });
    } else {
      console.error('El ID del paciente no está definido');
    }
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

  viewPatientDetails(): void {
    this.router.navigate(['/patient', this.patient.id]);
  }
}