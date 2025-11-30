import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AddReviewRequest, AddReviewResponse, GetReviewsResponse } from '../interfaces/review';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = '/api';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}


  addReview(consultationId: number, request: AddReviewRequest): Observable<AddReviewResponse> {
    return this.http.post<AddReviewResponse>(
      `${this.apiUrl}/consultations/${consultationId}/review`,
      request
    );
  }

 
  getReviewsWithAverage(): Observable<GetReviewsResponse> {

    const doctorDataStr = this.cookieService.get('doctor_data');
    
    if (!doctorDataStr) {
      console.error('No se encontró doctor_data en cookies');
      return throwError(() => new Error('No se encontró información del doctor autenticado'));
    }

    let doctor;
    try {
      doctor = JSON.parse(decodeURIComponent(doctorDataStr));
    } catch (e) {
      console.error('Error al parsear doctor data:', e);
      return throwError(() => new Error('Error al leer información del doctor'));
    }

    const doctorId = doctor.id;

    if (!doctorId) {
      console.error('Doctor ID no encontrado en:', doctor);
      return throwError(() => new Error('ID de doctor no encontrado'));
    }

    console.log('Obteniendo reviews para doctor ID:', doctorId);

    return this.http.get<GetReviewsResponse>(
      `${this.apiUrl}/doctor/${doctorId}/reviews`
    );
  }
}