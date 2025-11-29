import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesControl {
  private selectedFieldSubject = new BehaviorSubject<string | null>(null);
  public selectedField$ = this.selectedFieldSubject.asObservable();

  private fieldImageMap: { [key: string]: string } = {
    // Step 1 - Medidas básicas y circunferencias
    'cintura': '/assets/avatar-pngs/grasa/hover-cintura.png',
    'cadera': '/assets/avatar-pngs/grasa/hover-cadera.png',
    'brazoRelajado': '/assets/avatar-pngs/grasa/hover-brazo.png',
    'cuello': '/assets/avatar-pngs/grasa/hover-cuello.png',
    'muslo': '/assets/avatar-pngs/grasa/hover-muslo-superior.png',

    // Step 2 - Pliegues cutáneos
    'biceps': '/assets/avatar-pngs/pliegues-frente/hover-bicep.png',
    'triceps': '/assets/avatar-pngs/pliegues-espalda/hover-tricep.png',
    'subescapular': '/assets/avatar-pngs/pliegues-espalda/hover-subescapular.png',
    'ileocrestal': '/assets/avatar-pngs/pliegues-espalda/hover-ileocestral.png',
    'suprailiaco': '/assets/avatar-pngs/pliegues-frente/hover-suprailico.png',
    'abdominal': '/assets/avatar-pngs/pliegues-frente/hover-abdominal.png',
    'axilaMedial': '/assets/avatar-pngs/pliegues-espalda/hover-axilar-medial.png',
    'pectoral': '/assets/avatar-pngs/pliegues-frente/hover-pectoral.png',
  }

  highlightField(fieldName: string): void {
    this.selectedFieldSubject.next(fieldName);
  }

  clearHighlight(): void {
    this.selectedFieldSubject.next(null);
  }

  getHighlightImage(fieldName: string): string | null {
    return this.fieldImageMap[fieldName] || null;
  }

  getCurrentHighlightImage(): string | null {
    const currentField = this.selectedFieldSubject.value;
    return currentField ? this.getHighlightImage(currentField) : null;
  }
}
