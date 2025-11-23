import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  CreateConsultationRequest, 
} from '../interfaces/consultation';
import { ConsultationResponse 
} from '../interfaces/api/consultation-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) { }

  /**
   * Crea una nueva consulta con métricas y notas
   * @param consultation Datos de la consulta a crear
   * @returns Observable con la respuesta que incluye indicadores y métricas calculadas
   */
  createConsultation(consultation: CreateConsultationRequest): Observable<ConsultationResponse> {
    if (environment.enableDebugMode) {
      console.log('📝 Creando consulta:', consultation);
    }
    return this.http.post<ConsultationResponse>('/api/consultations', consultation);
  }

  /**
   * Obtiene todas las consultas de un paciente
   * @param patientId ID del paciente
   * @returns Observable con la lista de consultas
   */
  getConsultationsByPatient(patientId: number): Observable<any> {
    if (environment.enableDebugMode) {
      console.log('📋 Obteniendo consultas del paciente:', patientId);
    }
    return this.http.get<any>(`/api/consultations/patient/${patientId}`);
  }

  /**
   * Obtiene una consulta específica por ID
   * @param consultationId ID de la consulta
   * @returns Observable con los detalles de la consulta
   */
  getConsultationById(consultationId: number): Observable<ConsultationResponse> {
    if (environment.enableDebugMode) {
      console.log('🔍 Obteniendo consulta con ID:', consultationId);
    }
    return this.http.get<ConsultationResponse>(`/api/consultations/${consultationId}`);
  }

  /**
   * Actualiza una consulta existente
   * @param consultationId ID de la consulta
   * @param consultation Datos actualizados
   * @returns Observable con la consulta actualizada
   */
  updateConsultation(consultationId: number, consultation: CreateConsultationRequest): Observable<ConsultationResponse> {
    if (environment.enableDebugMode) {
      console.log('✏️ Actualizando consulta ID:', consultationId);
    }
    return this.http.put<ConsultationResponse>(`/api/consultations/${consultationId}`, consultation);
  }

  /**
   * Elimina una consulta
   * @param consultationId ID de la consulta a eliminar
   * @returns Observable con la respuesta
   */
  deleteConsultation(consultationId: number): Observable<any> {
    if (environment.enableDebugMode) {
      console.log('🗑️ Eliminando consulta ID:', consultationId);
    }
    return this.http.delete<any>(`/api/consultations/${consultationId}`);
  }
}
