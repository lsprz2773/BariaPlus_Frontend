import { Component, Input } from '@angular/core';
import { Review } from '../../../../core/interfaces/review';
@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.html',
  styleUrl: './review-list.css'
})
export class ReviewList {
  @Input() reviews: Review[] = [];
}