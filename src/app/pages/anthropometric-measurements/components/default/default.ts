import { Component } from '@angular/core';
import { AnthropometricMeasurements } from '../../anthropometric-measurements';

@Component({
  selector: 'app-default',
  standalone: false,
  templateUrl: './default.html',
  styleUrl: './default.css'
})
export class Default {

  forms!: AnthropometricMeasurements;

  constructor(
    private anthropometricMeasurements: AnthropometricMeasurements) { }

  

}
