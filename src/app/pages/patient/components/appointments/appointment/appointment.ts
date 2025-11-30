import {Component, Input} from '@angular/core';
import {ConsultationSummary} from '../../../../../core/interfaces/patient';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment {
  @Input() appointment!: ConsultationSummary;
}
