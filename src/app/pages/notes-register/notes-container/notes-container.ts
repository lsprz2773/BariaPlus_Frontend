import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() continuePressed = new EventEmitter<void>();

  constructor(private router: Router, private consultationState: ConsultationStateService) {}

  ngOnInit() {
    this.notes = this.consultationState.getNotes();
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }
  onContinue(){
    // ✅ Solo emite el evento, el padre (notes-register) maneja la navegación
    this.continuePressed.emit();
  }

  onDetails(){
    this.router.navigate(['/notes-details']);
  }
}
