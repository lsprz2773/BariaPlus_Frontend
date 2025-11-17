import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from '../../../core/interfaces/form-item';

@Component({
  selector: 'app-reusable-form',
  standalone: false,
  templateUrl: './reusable-form.html',
  styleUrls: ['./reusable-form.css']
})
export class ReusableForm {
  
  // ✅ Recibe el FormGroup desde el padre
  @Input() formGroup!: FormGroup;
  
  // ✅ Recibe la configuración de qué campos mostrar
  @Input() title: string = '';
  @Input() formItems: FormItem[] = [];
  @Input() classHelper: string = '';
  @Input() 

  // ✅ TrackBy para optimizar renderizado
  trackByName(_: number, item: FormItem) {
    return item.name;
  }
}
