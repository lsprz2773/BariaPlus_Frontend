import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {PatientResponse} from '../../../../core/interfaces/patient';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats {
  @Input() patientId!: number;
  @Input() patientData!: PatientResponse | null;

  constructor(private router:Router) {
  }

  verifyConsultations():boolean{
    if (!this.patientData?.patient.consultations) {
      return false;
    }
    return this.patientData.patient.consultations.length > 0;
  }

  onViewStats(){
    this.router.navigate(['stats', this.patientId])
  }
}

