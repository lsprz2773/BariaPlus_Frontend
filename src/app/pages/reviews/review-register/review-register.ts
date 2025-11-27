import { Component } from '@angular/core';

@Component({
  selector: 'app-review-register',
  standalone: false,
  templateUrl: './review-register.html',
  styleUrl: './review-register.css'
})
export class ReviewRegister {
  rating: number = 0;
  comment: string = '';

  onRatingChange(newRating: number): void {
    this.rating = newRating;
    console.log('Nueva calificación:', this.rating);
  }

  onSave(): void {
    console.log('Guardando valoración:', {
      rating: this.rating,
      comment: this.comment
    });
  }
}