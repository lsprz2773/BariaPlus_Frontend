import {Component, Input} from '@angular/core';
import {Note as NoteC} from '../../../core/interfaces/consultation';

@Component({
  selector: 'app-note',
  standalone: false,
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {
  @Input() description!: string;
  @Input() categoryId!: number;

  getIconPath(categoryId: number):string | undefined {
    switch (categoryId) {
      case 1: return 'assets/iconos/emotional.png';
      case 2: return 'assets/iconos/sleepquality.png';
      case 3: return 'assets/iconos/diet.png';
      case 4: return 'assets/iconos/diet.png';
      case 5: return 'assets/iconos/progress.png';
      case 6: return 'assets/iconos/meds.png';
      case 7: return 'assets/iconos/food.png';
      case 8: return 'assets/iconos/24h.png';
    }
    return undefined;
  }

  getCategory(categoryId: number):string | undefined {
    switch (categoryId) {
      case 1: return 'Estado emocional';
      case 2: return 'Calidad de sueño';
      case 3: return 'Dieta';
      case 4: return 'Opinion de dieta';
      case 5: return 'Evolucion del paciente';
      case 6: return 'Terapia farmacologica';
      case 7: return 'Alimentos';
      case 8: return 'Recordatorio 24H';
    }
    return undefined;
  }

}
