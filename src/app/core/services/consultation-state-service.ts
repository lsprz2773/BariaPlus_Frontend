import { Injectable } from '@angular/core';
import {Note} from '../interfaces/consultation';

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
}
