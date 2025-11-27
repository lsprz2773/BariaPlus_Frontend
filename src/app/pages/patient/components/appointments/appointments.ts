import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class Appointments {
  @Input() patientId: number = 0;
  @Input() medicalRecordId: number = 0;

  appointments: { id: string, date: string }[] = [];
}
