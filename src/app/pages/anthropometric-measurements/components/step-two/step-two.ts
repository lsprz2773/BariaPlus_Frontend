import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from '../../../../core/interfaces/form-item';
import { FormGroup } from '@angular/forms';
import { ImagesControl } from '../images-control';

@Component({
  selector: 'app-step-two',
  standalone: false,
  templateUrl: './step-two.html',
  styleUrl: './step-two.css'
})
export class StepTwo {

  @Input() form!: FormGroup;
  @Input() fields: FormItem[] = [];
  @Input() title: string = '';

  constructor(private avatarService: ImagesControl) {}

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

  onFieldFocus(fieldName: string): void {
    this.avatarService.highlightField(fieldName);
  }

  onFieldBlur(): void {
    this.avatarService.clearHighlight();
  }
}
