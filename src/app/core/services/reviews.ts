import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddReviewRequest, AddReviewResponse, Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Agregar review a una consulta
  addReview(consultationId: number, request: AddReviewRequest): Observable<AddReviewResponse> {
    return this.http.post<AddReviewResponse>(
      `${this.apiUrl}/consultations/${consultationId}/review`,
      request
    );
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews`);
  }
}
