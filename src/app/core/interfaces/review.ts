export interface Review {
  id?: number;
  puntuation: number;
  comments: string;
  date?: string;
  medicalConsultationId: number;
  patientName?: string;
  gender?: 'male' | 'female';
}

export interface AddReviewRequest {
  puntuation: number;
  comments: string;
}

export interface AddReviewResponse {
  success: boolean;
  message?: string;
  review?: Review;
}
