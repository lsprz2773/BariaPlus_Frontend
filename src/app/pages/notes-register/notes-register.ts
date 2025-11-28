import { Component, OnInit } from '@angular/core';
import { FormItem } from '../../core/interfaces/form-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../core/interfaces/consultation';
import { ConsultationService } from '../../core/services/consultation-service';
import { ConsultationStateService } from '../../core/services/consultation-state-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes-register',
  standalone: false,
  templateUrl: './notes-register.html',
  styleUrl: './notes-register.css'
})
export class NotesRegister implements OnInit {

  constructor(
    public fb: FormBuilder,
    private consultation: ConsultationService,
    private consultationState: ConsultationStateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  notesForm!: FormGroup;
  patientId: number = 0;
  medicalRecordId: number = 0;
  ngOnInit() {
    this.initForm();
    this.route.queryParamMap.subscribe(params => {
      this.patientId = Number(params.get('patientId')) || 0;
      this.medicalRecordId = Number(params.get('medicalRecordId')) || 0;
    });

  }

  initForm() {
    this.notesForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  noteForm: FormItem[] = [
    {
      type: "select",
      placeholder: 'Categoria de nota',
      required: true,
      name: "category",
      options: ['Recordatorio 24 h', 'Alimentos', 'Estado emocional', 'Calidad de sueño', 'Dieta', 'Opinion dieta', 'Evolucion del paciente', 'Terapia farmacologica']
    },
    {
      type: "text",
      placeholder: "Describa la nota",
      name: "description",
      required: true,
    }
  ]

  addNote() {
    if (this.notesForm.invalid) {
      this.notesForm.markAllAsTouched();
      return
    }

    const values = this.notesForm.getRawValue();

    const newNote: Note = {
      description: values.description,
      categoryId: this.mapCategory(values.category)
    }

    this.consultationState.addNote(newNote);

    this.notesForm.reset();
  }

  mapCategory(category: string): number {
    switch (category) {
      case 'Estado emocional': return 1;
      case 'Calidad de sueño': return 2;
      case 'Dieta': return 3;
      case 'Opinion dieta': return 4;
      case 'Evolucion del paciente': return 5;
      case 'Terapia farmacologica': return 6;
      case 'Alimentos': return 7;
      case 'Recordatorio 24 h': return 8;
      default: return 0;
    }
  }

  continueToMeasurements() {
    const notes = this.consultationState.getNotes();

    console.log('🚀 continueToMeasurements - IDs:', {
      patientId: this.patientId,
      medicalRecordId: this.medicalRecordId,
      notesCount: notes.length
    });

    if (this.patientId === 0 || this.medicalRecordId === 0) {
      alert('❌ Error: No se pudieron cargar los IDs. Intenta recargar la página.');
      console.error('❌ IDs inválidos en notes-register:', {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId
      });
      return;
    }

    if (notes.length === 0) {
      alert('⚠️ Debes agregar al menos una nota antes de continuar');
      return;
    }

    this.router.navigate(['/measurements'], {
      queryParams: {
        patientId: this.patientId,
        medicalRecordId: this.medicalRecordId
      }
    });
  }
}
