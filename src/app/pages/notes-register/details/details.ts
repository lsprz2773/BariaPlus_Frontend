import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../core/interfaces/consultation';
import {ConsultationStateService} from '../../../core/services/consultation-state-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  notes: Note[] = [];

  constructor(private consultationState: ConsultationStateService, private router: Router) {
  }

  ngOnInit() {
    this.notes = this.consultationState.getNotes();
  }

  onCancel() {
    this.router.navigate(['/note-register']);
  }
  onContinue(){
    this.router.navigate(['/measurements']);
  }
}
