
export interface Review {
  id?: number;
  puntuation: number;
  comments: string;
  date?: string;
  medicalConsultationId?: number;
  name?: string; 
  patientName?: string;
  gender?: 'male' | 'female';
}

export interface AddReviewRequest {
  puntuation: number;
  comments: string;
}

export interface AddReviewResponse {
  success: boolean;
  message: string;
  review?: ReviewDTO;
}

export interface ReviewDTO {
  id: number;
  puntuation: number;
  comments: string;
  date: string;
}


export interface GetReviewsResponse {
  success: boolean;
  message: string;
  average: string; 
  reviews: ReviewResponse[];
}

export interface ReviewResponse {
  id: number;
  name: string; 
  comments: string;
  date: string;
  puntuation: number;
}
