import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormItem } from '../../core/interfaces/form-item';


@Component({
  selector: 'app-anthropometric-measurements',
  standalone: false,
  templateUrl: './anthropometric-measurements.html',
  styleUrl: './anthropometric-measurements.css'
})
export class AnthropometricMeasurements {

  currentStep: number = 1;
  totalSteps: number = 3;
  isSubmitted: boolean = false;


  // Navegación
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  submitAllData(): void {
    if (this.patientForm.invalid) {
      alert('⚠️ Por favor completa todos los campos requeridos');
      this.patientForm.markAllAsTouched();
      return;
    }
    this.isSubmitted = true;
  }
}