import {Doctor } from "./doctor";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    doctor: Doctor;
}
