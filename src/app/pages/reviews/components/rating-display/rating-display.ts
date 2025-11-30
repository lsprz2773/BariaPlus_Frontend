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

  onStarClick(star: number): void {
    if (!this.interactive) return;
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }

  // visualización 
  getStarClass(star: number): string {
    const diff = this.rating - star;
    
    if (diff >= 0) {
      return 'full';
    } else if (diff >= -0.5 && !this.interactive) {
      // mostrar medias estrellas en modo readonly
      return 'half';
    }
    return 'empty';
  }
}