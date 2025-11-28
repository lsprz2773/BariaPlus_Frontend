import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from '../../modal';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModal {
  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = 'Esta acción no se puede deshacer';
  @Input() confirmText: string = 'Eliminar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmButtonClass: string = 'btn-danger'; // Clase del botón
  @Input() icon: string = 'fa-exclamation-triangle';
  @Input() iconColor: string = '#d32f2f'; // 'danger' o 'info'
  @Input() isDangerous: boolean = true; // Para botones rojos (eliminar)
  @Input() isVisible: boolean = false;


  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  isModalOpen: boolean = false;

  constructor(public modalService: Modal) { }

  ngOnInit(): void {
    this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isModalOpen = isOpen;
    });
  }

  onConfirm(): void {
    this.confirmed.emit();
    this.closeModal();
  }

  onCancel(): void {
    this.cancelled.emit();
    this.closeModal();
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
}
