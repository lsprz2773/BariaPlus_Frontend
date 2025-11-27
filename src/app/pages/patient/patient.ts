import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../core/services/patient-service';
import { PatientResponse } from '../../core/interfaces/patient';

@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.html',
  styleUrl: './patient.css'
})
export class Patient implements OnInit {
  patientId: number = 0;
  medicalRecordId: number = 0;
  patientData: PatientResponse | null = null;

  constructor(private route: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.patientId = Number(params.get('id'));

      if (this.patientId > 0) {
        this.loadFromApi();
      }
    });
  }

  loadFromApi() {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (response: PatientResponse) => {
        if (response.patient && response.patient.medicalRecordId) {
          this.medicalRecordId = response.patient.medicalRecordId;
          console.log('Medical Record ID:', this.medicalRecordId);
        } else {
          console.warn('No se encontró medicalRecordId en la respuesta');
        }
      },
      error: (error) => {
        console.error('Error al cargar paciente:', error);
      }
    });
  }
}