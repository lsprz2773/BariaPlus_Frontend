import { Component, Input } from '@angular/core';
import { FormItem } from '../../../../core/interfaces/form-item';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  standalone: false,
  templateUrl: './step-three.html',
  styleUrl: './step-three.css'
})
export class StepThree {
  @Input() form!: FormGroup;
  @Input() fields: FormItem[] = [];
  @Input() title: string = '';


  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}
