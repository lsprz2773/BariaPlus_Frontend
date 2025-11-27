import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {

  @Input() patientId: number = 0;
  @Input() medicalRecordId: number = 0;

  constructor(
    private route: Router
  ) { }

  routeToAppointmentCreation(): void {
    console.log('🚀 Top Bar - IDs recibidos:', {
      patientId: this.patientId,
      medicalRecordId: this.medicalRecordId
    });

    if (this.patientId === 0 || this.medicalRecordId === 0) {
      alert('❌ Error: No se pudieron cargar los datos del paciente. Intenta recargar la página.');
      console.error('❌ IDs inválidos en top-bar:', {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId
      });
      return;
    }

    this.route.navigate(['/note-register']), {
      queryParams: {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId
      }
    }
  }
}

