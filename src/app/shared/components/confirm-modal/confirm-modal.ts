import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Modal } from '../../modal';

type ModalType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModal implements OnChanges {
  @Input() type: ModalType = 'confirm';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() confirmText: string = '';
  @Input() cancelText: string = 'Cancelar';
  @Input() isVisible: boolean = false;
  @Input() showCancel: boolean = true;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  icon: string = '';
  iconColor: string = '';
  confirmButtonClass: string = '';
  isDangerous: boolean = false;
  isModalOpen: boolean = false;

  constructor(public modalService: Modal) { }

  ngOnInit(): void {
    this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isModalOpen = isOpen;
    });
    this.configureModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] || changes['isVisible']) {
      this.configureModal();
      if (changes['isVisible'] && this.isVisible) {
        this.modalService.openModal();
      } else if (changes['isVisible'] && !this.isVisible) {
        this.modalService.closeModal();
      }
    }
  }

  private configureModal(): void {
    switch (this.type) {
      case 'success':
        this.icon = 'fa-check-circle';
        this.iconColor = 'var(--primary-color)';
        this.confirmButtonClass = 'btn-success';
        this.isDangerous = false;
        this.showCancel = false;
        if (!this.title) this.title = '¡Éxito!';
        if (!this.confirmText) this.confirmText = 'Aceptar';
        break;
        
      case 'error':
        this.icon = 'fa-times-circle';
        this.iconColor = '#f44336';
        this.confirmButtonClass = 'btn-danger';
        this.isDangerous = true;
        this.showCancel = false;
        if (!this.title) this.title = 'Error';
        if (!this.confirmText) this.confirmText = 'Aceptar';
        break;
        
      case 'warning':
        this.icon = 'fa-exclamation-triangle';
        this.iconColor = 'var(--secondary-color)';
        this.confirmButtonClass = 'btn-warning';
        this.isDangerous = true;
        this.showCancel = false;
        if (!this.title) this.title = 'Advertencia';
        if (!this.confirmText) this.confirmText = 'Entendido';
        break;
        
      case 'info':
        this.icon = 'fa-info-circle';
        this.iconColor = 'var(--tertiary-color)';
        this.confirmButtonClass = 'btn-primary';
        this.isDangerous = false;
        this.showCancel = false;
        if (!this.title) this.title = 'Información';
        if (!this.confirmText) this.confirmText = 'Aceptar';
        break;
        
      case 'confirm':
      default:
        this.icon = 'fa-question-circle';
        this.iconColor = '#ff5722';
        this.confirmButtonClass = 'btn-danger';
        this.isDangerous = true;
        this.showCancel = true;
        if (!this.title) this.title = '¿Estás seguro?';
        if (!this.confirmText) this.confirmText = 'Confirmar';
        break;
    }
  }

  handleConfirm(): void {
    this.onConfirm.emit();
    this.closeModal();
  }

  handleCancel(): void {
    this.onCancel.emit();
    this.closeModal();
  }

  closeModal(): void {
    this.modalService.closeModal();
    this.onClose.emit();
  }

  onBackdropClick(): void {
    this.closeModal();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }
}
