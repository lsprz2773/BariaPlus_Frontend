import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../core/interfaces/consultation';
import {Router} from '@angular/router';
import {ConsultationStateService} from '../../../core/services/consultation-state-service';

@Component({
  selector: 'app-notes-container',
  standalone: false,
  templateUrl: './notes-container.html',
  styleUrl: './notes-container.css'
})
export class NotesContainer implements OnInit {

  notes: Note[] = [];

  constructor(private router: Router, private consultationState: ConsultationStateService) {}

  ngOnInit() {
    this.notes = this.consultationState.getNotes();
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }
  onContinue(){
    this.router.navigate(['/measurements']);
  }

  onDetails(){
    this.router.navigate(['/notes-details']);
  }
}
