import { Component } from '@angular/core';

@Component({
  selector: 'app-review-rating',
  standalone: false,
  templateUrl: './review-rating.html',
  styleUrl: './review-rating.css'
})
export class ReviewRating {
  averageRating: number = 4.5;
  
  reviews = [
    {
      patientName: 'Jorge Antionio Axayacatl Gómez Escamilla',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      gender: 'male'
    },
    {
      patientName: 'Luis Antonio Selvas de León',
      comment: 'No',
      gender: 'male'
    },
    {
      patientName: 'Emilia Gómez Utrilla',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gender: 'female'
    }
  ];
}