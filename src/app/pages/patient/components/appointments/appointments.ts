import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class Appointments implements OnInit, OnChanges{
  @Input() patientId: number = 0;
  @Input() medicalRecordId: number = 0;

  appointments: { id: string, date: string }[] = [];

  ngOnInit() {
    console.log('📅 Appointments ngOnInit - IDs:', {
      patientId: this.patientId,
      medicalRecordId: this.medicalRecordId
    });
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId']) {
      console.log(changes['patientId'].currentValue);
    }
    if (changes['medicalRecordId']) {
      console.log('🔄 medicalRecordId cambió:', changes['medicalRecordId'].currentValue);
    }
  }
}
