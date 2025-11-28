import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../../core/services/reviews';

@Component({
  selector: 'app-review-rating',
  standalone: false,
  templateUrl: './review-rating.html',
  styleUrl: './review-rating.css'
})
export class ReviewRating implements OnInit {
  averageRating: number = 0;
  reviews: any[] = [];
  isLoading: boolean = true;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    // Por ahora usa datos mock hasta que tengas el endpoint
    // Cuando implementes GET /api/reviews, descomenta esto:
    /*
    this.reviewsService.getAllReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.calculateAverage();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar reviews:', error);
        this.isLoading = false;
      }
    });
    */

    // TEMPORAL: Datos mock
    this.reviews = [
      {
        patientName: 'Jorge Antonio Axayacatl Gómez Escamilla',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        puntuation: 10, // 5.0 estrellas
        gender: 'male'
      },
      {
        patientName: 'Luis Antonio Selvas de León',
        comment: 'No',
        puntuation: 8, // 4.0 estrellas
        gender: 'male'
      },
      {
        patientName: 'Emilia Gómez Utrilla',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        puntuation: 9, // 4.5 estrellas
        gender: 'female'
      }
    ];
    
    this.calculateAverage();
    this.isLoading = false;
  }

  calculateAverage(): void {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }

    const sum = this.reviews.reduce((acc, review) => {
      return acc + (review.puntuation / 2);
    }, 0);

    this.averageRating = sum / this.reviews.length;
  }
}
