import { Component, OnInit, OnDestroy } from '@angular/core';
import { Modal as ModalService } from '../../modal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: false,
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css'
})
export class LoginModal implements OnInit, OnDestroy {

  isModalOpen: boolean = false; //variable local para el modal del template 

  // Guardar referencia para poder cancerlar la suscripción
  private modalSubscription!: Subscription;
  constructor(
    private modalService: ModalService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    this.modalSubscription = this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isModalOpen = isOpen;

       // Prevenir scroll cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    });
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onBackdropClick(): void {
    this.closeModal();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  onContinuar():void{
    this.closeModal();
    this.router.navigate(['/dashboard']);
  }

}
