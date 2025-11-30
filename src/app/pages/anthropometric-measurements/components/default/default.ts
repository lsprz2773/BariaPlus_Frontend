import { Component } from '@angular/core';
import { AnthropometricMeasurements } from '../../anthropometric-measurements';
import { StepOne } from '../step-one/step-one';
import { StepTwo } from '../step-two/step-two';
import { StepThree } from '../step-three/step-three';
import { ImagesControl } from '../images-control';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-default',
  standalone: false,
  templateUrl: './default.html',
  styleUrl: './default.css'
})
export class Default {
  highlightImage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private avatarService: ImagesControl) { }

  ngOnInit(): void { // suscribirse a los cambios de campo seleccionado
    this.avatarService.selectedField$
      .pipe(takeUntil(this.destroy$))
      .subscribe(fieldName => {
        if (fieldName) {
          this.highlightImage = this.avatarService.getHighlightImage(fieldName);
        } else {
          this.highlightImage = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
