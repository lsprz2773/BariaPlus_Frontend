import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CookiesStorage} from './cookies-storage';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../interfaces/api/login-request';
import {Observable, tap} from 'rxjs';
import {LoginResponse} from '../interfaces/api/login-response';
import {environment} from '../../../environments/environment.development';
import {RegisterResponse} from '../interfaces/api/register-response';
import {RegisterRequest} from '../interfaces/api/register-request';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest) :Observable<LoginResponse>{
    const url = environment.AUTH_API_URL + '/login';
    //REGRESAR A ESTO DESPUES DE ARREGLAR CORSreturn this.http.post<LoginResponse>(url, request);
    return this.http.post<LoginResponse>('/api/auth/login', request).pipe()
  }

  register(request: RegisterRequest): Observable<RegisterResponse>{
    const url = environment.AUTH_API_URL + '/register';
    //REGRESAR A ESTO DESPUES DE ARREGLAR CORS return this.http.post<RegisterResponse>(url, request);
    return this.http.post<RegisterResponse>('/api/auth/register', request).pipe()
  }
}
