import { Component } from '@angular/core';
import {FormItem} from '../../../../../core/interfaces/form-item';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  step: number = 2;
}
