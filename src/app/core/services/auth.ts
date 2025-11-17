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
    return this.http.post<LoginResponse>(url, request);
  }

  register(request: RegisterRequest): Observable<RegisterResponse>{
    const url = environment.AUTH_API_URL + '/register';
    return this.http.post<RegisterResponse>(url, request);
  }
}
