import {Component, Input} from '@angular/core';
import {Note} from '../../../core/interfaces/consultation';

@Component({
  selector: 'app-notes-container',
  standalone: false,
  templateUrl: './notes-container.html',
  styleUrl: './notes-container.css'
})
export class NotesContainer {
  @Input() notes!: Note[];
    onCancel(){}
    onContinue(){}
}
