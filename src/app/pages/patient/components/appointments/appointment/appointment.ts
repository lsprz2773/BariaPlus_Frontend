import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConsultationSummary} from '../../../../../core/interfaces/patient';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment {
  @Input() appointment!: ConsultationSummary;
}
