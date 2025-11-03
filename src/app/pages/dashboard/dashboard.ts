import { Component, OnInit } from '@angular/core';
import { Patient } from '../../core/interfaces/patient';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchTerm: string = '';

  //simiulacion
  loadPatients(){
    this.patients = [
      //proximamente api Bv
      {
        id: 1,
        nombre: 'Jorge Antonio Axayacatl',
        apellidos: 'Gómez Escamilla',
        avatar: 'assets/otros/men-avatar.png'
      },
      {
        id: 2,
        nombre: 'Alicia Jacqueline',
        apellidos: 'Ocaña Ozuna',
        avatar: 'assets/otros/women-avatar.png'
      }
    ];

    this.filteredPatients = [...this.patients]; // los 3 puntos es de lo q pide la interfaz menos el id idk
  }

  ngOnInit(): void {
      this.loadPatients();
  }
}
