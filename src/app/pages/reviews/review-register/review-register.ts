import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../../core/services/reviews';

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
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la consulta desde la ruta
    this.route.params.subscribe(params => {
      this.consultationId = +params['id'] || 0;
    });
  }

  onRatingChange(newRating: number): void {
    this.rating = newRating;
    console.log('Nueva calificación:', this.rating);
  }

  onSave(): void {
    // Validaciones
    if (this.rating === 0) {
      this.errorMessage = 'Por favor selecciona una calificación';
      return;
    }

    if (!this.comment.trim()) {
      this.errorMessage = 'Por favor escribe un comentario';
      return;
    }

    if (!this.consultationId) {
      this.errorMessage = 'ID de consulta inválido';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Convertir rating a entero (multiplicar por 2 para manejar 0.5)
    // Por ejemplo: 4.5 -> 9, 5.0 -> 10
    // Luego en el backend puedes dividir entre 2 si es necesario
    // O simplemente mandar el valor como está si tu BD acepta decimales
    const puntuationValue = Math.round(this.rating * 2);

    const reviewData = {
      puntuation: puntuationValue,
      comments: this.comment.trim()
    };

    this.reviewsService.addReview(this.consultationId, reviewData)
      .subscribe({
        next: (response) => {
          console.log('Review guardada exitosamente:', response);
          this.isLoading = false;
          
          // Limpiar formulario
          this.rating = 0;
          this.comment = '';
          
          // Redirigir o mostrar mensaje de éxito
          alert('Valoración guardada exitosamente');
          this.router.navigate(['/reviews/promedio']);
        },
        error: (error) => {
          console.error('Error al guardar review:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al guardar la valoración';
        }
      });
  }
}
