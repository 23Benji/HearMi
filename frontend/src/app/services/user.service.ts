import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject holds the current value and emits it to new subscribers
  private avatarSubject = new BehaviorSubject<string | null>(null);
  public avatar$ = this.avatarSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Uploads avatar and updates the local state on success.
   */
  uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.post<{ avatarUrl: string }>(`${environment.apiUrl}/api/user/avatar`, formData)
      .pipe(
        tap(res => this.avatarSubject.next(res.avatarUrl))
      );
  }

  /**
   * Fetches avatar and updates the local state on success.
   */
  getAvatar(): Observable<{ avatarUrl: string | null }> {
    return this.http.get<{ avatarUrl: string | null }>(`${environment.apiUrl}/api/user/avatar`)
      .pipe(
        tap(res => this.avatarSubject.next(res.avatarUrl))
      );
  }

  removeAvatar(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/user/avatar`)
      .pipe(
        tap(() => this.avatarSubject.next(null)) // Update state to null
      );
  }
}
