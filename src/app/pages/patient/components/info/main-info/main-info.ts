import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PatientResponse } from '../../../../../core/interfaces/patient';
import { PatientEditService } from '../../../../../core/services/patient-edit-service';

@Component({
  selector: 'app-main-info',
  standalone: false,
  templateUrl: './main-info.html',
  styleUrl: './main-info.css'
})
export class MainInfo {
  @Input() patient!: PatientResponse;

  constructor(
    private router: Router,
    private patientEditService: PatientEditService
  ) {}

  onEdit(): void {
    if (this.patient?.patient) {
      this.patientEditService.setPatientForEdit(this.patient.patient);
      this.router.navigate(['/patient-register']);
    }
  }
}
