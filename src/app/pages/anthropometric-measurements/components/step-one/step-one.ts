import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from '../../../../core/interfaces/form-item';

@Component({
  selector: 'app-step-one',
  standalone: false,
  templateUrl: './step-one.html',
  styleUrl: './step-one.css'
})
export class StepOne {

  @Input() form!: FormGroup;
  @Input() fields: FormItem[] = [];
  @Input() title: string = '';

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}
