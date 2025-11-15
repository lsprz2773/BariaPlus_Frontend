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

  constructor(private patientService: PatientService) {
  }

  @Input() patient!: Patient

  menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation(); // Evita que el click se propague
    this.menuOpen = !this.menuOpen;
  }

  // Cierra el menú cuando haces click fuera
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