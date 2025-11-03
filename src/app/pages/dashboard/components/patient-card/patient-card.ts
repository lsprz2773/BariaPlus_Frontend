import { Component, HostListener, Input } from '@angular/core';
import { Patient } from '../../../../core/interfaces/patient';

@Component({
  selector: 'app-patient-card',
  standalone: false,
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css'
})
export class PatientCard {

  //gracias claudicita, al rato vemos que pedo

  @Input() patient!: Patient

  menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation(); // Evita que el click se propague
    this.menuOpen = !this.menuOpen;
  }

  // Cierra el menú cuando haces click fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.menuOpen = false;
  }

  onEdit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Editar');
    this.menuOpen = false;
    // Aquí tu lógica para editar
  }

  onDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Eliminar');
    this.menuOpen = false;
    // Aquí tu lógica para eliminar
  }
}