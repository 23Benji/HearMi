// frontend/src/app/services/training.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TrainingSession } from '../models/training-session';

export interface ExerciseSummary {
  exerciseId: number;
  exerciseName: string;
  sessions: number;
  bestAccuracy: number | null;
  bestStreak: number | null;
}

export interface RecentSessionSummary {
  id: number;
  exerciseId: number;
  exerciseName: string;
  score: number;
  totalQuestions: number | null;
  accuracy: number | null;
  bestStreak: number | null;
  createdAt: string;
}

export interface DashboardSummary {
  totalSessions: number;
  totalCorrect: number;
  overallAccuracy: number;
  perExercise: ExerciseSummary[];
  recentSessions: RecentSessionSummary[];
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  /**
   * Session speichern.
   * Erwartete Spalten in Supabase-Tabelle `results`:
   *  - exercise_id
   *  - score
   *  - total_questions
   *  - accuracy
   *  - best_streak
   *  (user_id, user_name, created_at werden im Backend gesetzt)
   */
  saveSession(session: TrainingSession): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/results`, {
      exercise_id: session.exerciseId,
      score: session.score,
      total_questions: session.totalQuestions,
      accuracy: session.accuracy,
      best_streak: session.bestStreak
    });
  }

  /**
   * Dashboard-Übersicht laden.
   */
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(
      `${environment.apiUrl}/api/results/summary`
    );
  }
}
