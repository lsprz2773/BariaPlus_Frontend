import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../../core/services/reviews';
import { Review } from '../../../core/interfaces/review';

@Component({
  selector: 'app-review-rating',
  standalone: false,
  templateUrl: './review-rating.html',
  styleUrl: './review-rating.css'
})
export class ReviewRating implements OnInit {
  averageRating: number = 0;
  reviews: Review[] = [];
  isLoading: boolean = true;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    
    this.reviewsService.getAllReviews().subscribe({
      next: (data) => {
        // Convertir puntuation de 1-10 a 0.5-5.0
        this.reviews = data.map(review => ({
          ...review,
          puntuation: review.puntuation / 2
        }));
        
        this.calculateAverage();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar reviews:', error);
        this.isLoading = false;
        this.reviews = [];
        this.averageRating = 0;
      }
    });
  }

  calculateAverage(): void {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }

    const sum = this.reviews.reduce((acc, review) => acc + review.puntuation, 0);
    this.averageRating = sum / this.reviews.length;
  }
}