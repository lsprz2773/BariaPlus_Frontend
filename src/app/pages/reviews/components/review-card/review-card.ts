import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  standalone: false,
  templateUrl: './review-card.html',
  styleUrl: './review-card.css'
})
export class ReviewCard{
  @Input() patientName: string = '';
  @Input() comment: string = '';
  @Input() gender: 'male' | 'female' = 'male';

}