import { Component } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: false,
  templateUrl: './step-indicator.html',
  styleUrl: './step-indicator.css'
})
export class StepIndicator {

    currentStep: number = 1;  // Paso actual
  totalSteps: number = 4;   // Total de pasos

  // Ir al siguiente paso
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  // Ir al paso anterior
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Ir a un paso específico
  goToStep(step: number) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
    }
  }

  // Verificar si es el último paso
  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  // Verificar si es el primer paso
  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  // Submit del formulario
  onSubmit() {
    if (this.isLastStep()) {
      console.log('Formulario completo - Guardar');
      // Aquí guardas todos los datos
    } else {
      this.nextStep();
    }
  }
}
