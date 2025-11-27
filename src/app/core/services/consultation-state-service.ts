import { Injectable } from '@angular/core';
import { Note, MetricValue, EnergeticExpenditure } from '../interfaces/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationStateService {
  //Este servicio sirve para ir guardando los datos de la consulta y poderlas pasar y tambien obtenerlas al ir cambiando de vistas

  //Apartado de notas
  private _notes: Note[] = [];

  getNotes() {
    return this._notes;
  }

  addNote(newNote: Note) {
    this._notes.push(newNote);
  }

  clearNotes(): void {
    this._notes = [];
  }

  //Apartado de medidas antropométricas
  private _metricValues: MetricValue[] = [];

  getMetricValues() {
    return this._metricValues;
  }

  setMetricValues(metrics: MetricValue[]): void {
    this._metricValues = metrics;
  }

  addMetricValue(metric: MetricValue): void {
    const existingIndex = this._metricValues.findIndex(
      m => m.metricsCatalogId === metric.metricsCatalogId
    );
    
    if (existingIndex !== -1) {
      this._metricValues[existingIndex] = metric;
    } else {
      this._metricValues.push(metric);
    }
  }

  clearMetricValues(): void {
    this._metricValues = [];
  }

  //Apartado de gasto energético
  private _energeticExpenditure: EnergeticExpenditure | null = null;

  getEnergeticExpenditure(): EnergeticExpenditure | null {
    return this._energeticExpenditure;
  }

  setEnergeticExpenditure(energetic: EnergeticExpenditure): void {
    this._energeticExpenditure = energetic;
  }

  clearEnergeticExpenditure(): void {
    this._energeticExpenditure = null;
  }

  clearAllConsultationData(): void {
    this.clearNotes();
    this.clearMetricValues();
    this.clearEnergeticExpenditure();
  }
}
