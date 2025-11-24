import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../core/interfaces/consultation';
import {ConsultationStateService} from '../../../core/services/consultation-state-service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  notes: Note[] = [];

  constructor(private consultationState: ConsultationStateService) {
  }

  ngOnInit() {
    this.notes = this.consultationState.getNotes();
  }

  onCancel() {}
  onContinue(){}
}
