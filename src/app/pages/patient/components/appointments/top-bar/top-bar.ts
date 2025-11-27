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
    this.route.navigate(['/note-register']), {
      queryParams: {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId
      }
    }
  }
}

