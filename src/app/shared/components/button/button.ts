import {Component, Input} from '@angular/core';
import {ButtonConfig} from '../../../core/interfaces/button-config';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() buttonInfo: ButtonConfig;

  btnConfig: ButtonConfig = {
    type:'submit',
    name: 'submitRegisterForm',
    text: 'Continuar',
    context: 'continue'
  };
}
