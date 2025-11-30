import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultationRequest } from '../interfaces/consultation';
import {
  ConsultationDetailResponse,
  ConsultationResponse,
} from '../interfaces/api/consultation-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  constructor(private http: HttpClient) {}

  createConsultation(consultation: ConsultationRequest): Observable<ConsultationResponse> {
    return this.http.post<ConsultationResponse>('/api/consultations', consultation);
  }

  getConsultationDetail(id: number): Observable<ConsultationDetailResponse> {
    return this.http.get<ConsultationDetailResponse>(`/api/consultations/${id}`);
  }

  getConsultationById(consultationId: number): Observable<ConsultationResponse> {
    return this.http.get<ConsultationResponse>(`/api/consultations/${consultationId}`);
  }

  // updateConsultation(consultationId: number, consultation: ConsultationRequest): Observable<ConsultationResponse> {
  //     return this.http.put<ConsultationResponse>(`/api/consultations/${consultationId}`, consultation);
  // }

  // deleteConsultation(consultationId: number): Observable<any> {
  //     return this.http.delete<any>(`/api/consultations/${consultationId}`);
  // }
}
