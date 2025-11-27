import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../../core/services/patient-service';
import { PatientResponse } from '../../../../core/interfaces/patient';

@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info implements OnInit {
  patientData: PatientResponse | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  medicalRecordId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.loadPatientData(Number(this.route.snapshot.paramMap.get('id')));
  }

  loadPatientData(patientId: number): void {
    this.patientService.getPatientById(patientId).subscribe({
      next: (response: PatientResponse) => {
        this.patientData = response;
        this.medicalRecordId = response.patient.medicalRecordId;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar la información del paciente:', error);
        this.isLoading = false;
        this.errorMessage = 'Error al cargar la información del paciente.';
      }
    });
  }
}
