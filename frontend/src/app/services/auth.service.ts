// frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'hearmi_token';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
