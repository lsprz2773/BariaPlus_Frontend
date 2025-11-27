import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-display',
  standalone: false,
  templateUrl: './rating-display.html',
  styleUrl: './rating-display.css'
})
export class RatingDisplay {
  @Input() rating: number = 0;
  @Input() interactive: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;

  onStarClick(star: number): void {
    if (!this.interactive) return;
    
    // Si el click es en la misma estrella, alternar entre .0 y .5
    if (Math.floor(this.rating) === star) {
      if (this.rating === star) {
        this.rating = star - 0.5;
      } else {
        this.rating = star;
      }
    } else {
      this.rating = star;
    }
    
    this.ratingChange.emit(this.rating);
  }

  onStarHover(star: number): void {
    if (!this.interactive) return;
    this.hoverRating = star;
  }

  onMouseLeave(): void {
    if (!this.interactive) return;
    this.hoverRating = 0;
  }

  getStarClass(star: number): string {
    const currentRating = this.hoverRating || this.rating;
    
    if (currentRating >= star) {
      return 'full';
    } else if (currentRating >= star - 0.5) {
      return 'half';
    }
    return 'empty';
  }
}