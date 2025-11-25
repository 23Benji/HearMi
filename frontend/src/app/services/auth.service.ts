// frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

interface JwtPayload {
  userId?: string;
  exp?: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'hearmi_token';
  private userIdKey = 'hearmi_user_id';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  /**
   * Speichert Token + User-Kennzeichnung (userId) in der SESSION.
   */
  saveToken(token: string) {
    // Token in Session speichern
    sessionStorage.setItem(this.tokenKey, token);

    // Versuchen, userId aus dem JWT zu lesen
    const payload = this.decodeToken(token);
    if (payload?.userId) {
      sessionStorage.setItem(this.userIdKey, payload.userId);
    } else {
      sessionStorage.removeItem(this.userIdKey);
    }
  }

  /**
   * Token aus der Session holen.
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  /**
   * User-Kennzeichnung (userId) aus der Session lesen.
   */
  getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }

  /**
   * Ist der User eingeloggt?
   * -> Token existiert
   * -> Token decodierbar
   * -> userId im Payload vorhanden
   * -> exp (falls vorhanden) noch nicht abgelaufen
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload || !payload.userId) return false;

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      // Token ist abgelaufen
      return false;
    }

    return true;
  }

  /**
   * Logout: komplette Session des Users löschen.
   */
  logout() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userIdKey);
  }

  /**
   * Hilfsfunktion: JWT-Payload decodieren.
   */
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
