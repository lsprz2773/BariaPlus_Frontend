import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../../core/services/reviews';
import { ReviewResponse } from '../../../core/interfaces/review';

@Component({
  selector: 'app-review-rating',
  standalone: false,
  templateUrl: './review-rating.html',
  styleUrl: './review-rating.css'
})
export class ReviewRating implements OnInit {
  averageRating: number = 0;
  reviews: ReviewResponse[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    
    this.reviewsService.getReviewsWithAverage().subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        
        if (response.success) {
          
          this.averageRating = parseFloat(response.average);
          
          
          this.reviews = response.reviews;
          
          console.log('Promedio:', this.averageRating);
          console.log('Reviews:', this.reviews);
        } else {
          this.errorMessage = response.message;
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar reviews:', error);
        this.errorMessage = error.message || 'Error al cargar las valoraciones';
        this.isLoading = false;
        this.reviews = [];
        this.averageRating = 0;
      }
    });
  }
}