import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from '../../../../core/interfaces/form-item';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: false,
  templateUrl: './step-two.html',
  styleUrl: './step-two.css'
})
export class StepTwo {

  @Input() form!: FormGroup;
  @Input() fields: FormItem[] = [];

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

}
