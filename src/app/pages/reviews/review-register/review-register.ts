import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../../core/services/reviews';
import { AddReviewRequest } from '../../../core/interfaces/review';

@Component({
  selector: 'app-review-register',
  standalone: false,
  templateUrl: './review-register.html',
  styleUrl: './review-register.css'
})
export class ReviewRegister implements OnInit {
  rating: number = 0;
  comment: string = '';
  consultationId: number = 0;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la consulta desde los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.consultationId = params['consultationId'] ? +params['consultationId'] : 0;
      
      if (!this.consultationId) {
        console.error('No se proporcionó ID de consulta');
        // Opcionalmente redirigir
        // this.router.navigate(['/reviews/promedio']);
      }
    });
  }

  onRatingChange(newRating: number): void {
    this.rating = newRating;
  }

  onSave(): void {
    if (this.rating < 0.5 || this.rating > 5) {
      alert('La calificación debe estar entre 0.5 y 5.0');
      return;
    }

    if (!this.comment.trim()) {
      alert('Por favor ingrese un comentario');
      return;
    }

    if (!this.consultationId) {
      alert('No se puede guardar la valoración sin una consulta asociada');
      return;
    }

    this.isSubmitting = true;

    // Convertir rating de 0.5-5.0 a 1-10 para la BD
    const puntuationForDB = Math.round(this.rating * 2);

    const request: AddReviewRequest = {
      puntuation: puntuationForDB,
      comments: this.comment
    };

    this.reviewsService.addReview(this.consultationId, request).subscribe({
      next: (response) => {
        console.log('Valoración guardada:', response);
        alert('Valoración guardada exitosamente');
        
        // Limpiar formulario
        this.rating = 0;
        this.comment = '';
        this.isSubmitting = false;
        
        // Redirigir a la vista de promedio
        this.router.navigate(['/reviews/promedio']);
      },
      error: (error) => {
        console.error('Error al guardar valoración:', error);
        alert(error.error?.message || 'Error al guardar la valoración');
        this.isSubmitting = false;
      }
    });
  }
}