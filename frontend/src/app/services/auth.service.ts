// frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

interface JwtPayload {
  userId?: string;
  username?: string;
  exp?: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'hearmi_token';
  private userIdKey = 'hearmi_user_id';
  private usernameKey = 'hearmi_username';

  constructor(private http: HttpClient) {}

  // Registrierung mit Email + Username + Passwort
  register(email: string, username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      email,
      username,
      password
    });
  }

  // Login mit Email ODER Username (identifier) + Passwort
  login(identifier: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
      identifier,
      password
    });
  }

  /**
   * Speichert Token + UserId + Username in der Session.
   */
  saveToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);

    const payload = this.decodeToken(token);

    if (payload?.userId) {
      sessionStorage.setItem(this.userIdKey, payload.userId);
    } else {
      sessionStorage.removeItem(this.userIdKey);
    }

    if (payload?.username) {
      sessionStorage.setItem(this.usernameKey, payload.username);
    } else {
      sessionStorage.removeItem(this.usernameKey);
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }

  getUsername(): string | null {
    return sessionStorage.getItem(this.usernameKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload || !payload.userId) return false;

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }

    return true;
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem(this.usernameKey);
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson) as JwtPayload;
    } catch {
      return null;
    }
  }
}
