import { Component } from '@angular/core';
import { Modal as ModalService } from '../../modal';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

   // Inyectar el servicio en el constructor
  constructor(private modalService: ModalService) { }

  //abrir el modal
  onLoginClick(): void {
    this.modalService.openModal();
  }

}
