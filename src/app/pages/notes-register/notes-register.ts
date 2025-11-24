import {Component, OnInit} from '@angular/core';
import {FormItem} from '../../core/interfaces/form-item';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../../core/interfaces/consultation';

@Component({
  selector: 'app-notes-register',
  standalone: false,
  templateUrl: './notes-register.html',
  styleUrl: './notes-register.css'
})
export class NotesRegister implements OnInit {

  notes:Note[] = [{
    description: 'Medicamento',
    categoryId: 2
  }]

  constructor(public fb: FormBuilder) {}

  notesForm!: FormGroup;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.notesForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

    noteForm:FormItem[] = [
      {
        type: "select",
        placeholder: 'Categoria de nota',
        required: true,
        name: "category",
        options: ['Recordatorio 24 h', 'Alimentos', 'Estado emocional', 'Calidad de sueño', 'Dieta', 'Evolucion del paciente', 'Terapia farmacologica']
      },
      {
        type: "text",
        placeholder: "Describa la nota",
        name: "description",
        required: true,
      }
      ]

  addNote() {}
}
