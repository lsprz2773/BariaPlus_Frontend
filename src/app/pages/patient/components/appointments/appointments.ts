import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ConsultationSummary, PatientResponse} from '../../../../core/interfaces/patient';
import {Consultation} from '../../../../core/interfaces/api/consultation-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class Appointments implements OnInit, OnChanges{
  @Input() patientId: number = 0;
  @Input() medicalRecordId: number = 0;
  @Input() patientData: PatientResponse | null = null;

  constructor(private router: Router) {
  }

  get appointments(): ConsultationSummary[]{
    if (!this.patientData?.patient?.consultations) {
      return [];
    }
    return this.patientData?.patient?.consultations ?? [];
  }

  onClick(appointmentId: number) {
    this.router.navigate(['/analysis', appointmentId]);
  }

    ngOnInit() {
      console.log('📅 Appointments ngOnInit - IDs:', {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId,
        patientData: this.patientData,
      });
    }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId']) {
      console.log(changes['patientId'].currentValue);
    }
    if (changes['medicalRecordId']) {
      console.log('🔄 medicalRecordId cambió:', changes['medicalRecordId'].currentValue);
    }
    if (changes['patientData'] && changes['patientData'].currentValue) {
      console.log('array de consultas',this.appointments);
    }
  }
}
