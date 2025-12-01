// frontend/src/app/pages/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import {
  TrainingService,
  DashboardSummary,
  ExerciseSummary,
  RecentSessionSummary
} from '../../services/training.service';
import { AuthService } from '../../services/auth.service';

interface TrainingCardView {
  exerciseId: number;
  label: string;
  description: string;
  iconName: string;
  colorClass: 'bg-cyan' | 'bg-purple' | 'bg-orange' | 'bg-green';
  routeSegment: string;
  sessions: number;
  bestAccuracy: number;
  bestStreak: number;
}

interface RecentActivityView {
  id: number;
  modeName: string;
  iconName: string;
  colorClass: string;
  score: number;
  total: number | null;
  accuracy: number | null;
  streak: number | null;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  username: string | null = null;

  // Top-Stats
  totalSessions = 0;
  totalCorrect = 0;
  overallAccuracy = 0;

  // Status für API-Call
  loading = false;
  error = '';

  // Karten-Daten
  trainingCards: TrainingCardView[] = [];

  // Recent Activity
  recentActivities: RecentActivityView[] = [];

  // Basis-Definition der 4 Trainingsmodi
  private readonly baseCards: TrainingCardView[] = [
    {
      exerciseId: 1,
      label: 'Single Note',
      description: 'Identify individual notes',
      iconName: 'music',
      colorClass: 'bg-cyan',
      routeSegment: 'single-note',
      sessions: 0,
      bestAccuracy: 0,
      bestStreak: 0
    },
    {
      exerciseId: 2,
      label: 'Chord Recognition',
      description: 'Identify chord types',
      iconName: 'music-2',
      colorClass: 'bg-purple',
      routeSegment: 'chord-recognition',
      sessions: 0,
      bestAccuracy: 0,
      bestStreak: 0
    },
    {
      exerciseId: 3,
      label: 'Pitch Comparison',
      description: 'Compare note intervals',
      iconName: 'git-compare',
      colorClass: 'bg-orange',
      routeSegment: 'pitch-comparison',
      sessions: 0,
      bestAccuracy: 0,
      bestStreak: 0
    },
    {
      exerciseId: 4,
      label: 'Interval Training',
      description: 'Recognize musical intervals',
      iconName: 'waves',
      colorClass: 'bg-green',
      routeSegment: 'interval-training',
      sessions: 0,
      bestAccuracy: 0,
      bestStreak: 0
    }
  ];

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Username aus Session lesen
    this.username = this.auth.getUsername();
    // Dashboard-Stats laden
    this.loadStats();
  }

  /**
   * Lädt die Dashboard-Zusammenfassung vom Backend.
   */
  private loadStats(): void {
    this.loading = true;
    this.error = '';

    this.trainingService.getDashboardSummary().subscribe({
      next: (summary: DashboardSummary) => {
        this.loading = false;
        this.applySummary(summary);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading dashboard summary', err);
        this.error =
          err?.error?.error ?? 'Could not load statistics from the server.';
      }
    });
  }

  /**
   * Überträgt die Daten aus der API-Antwort ins UI-Model.
   */
  private applySummary(summary: DashboardSummary): void {
    // Top-Karten
    this.totalSessions = summary.totalSessions;
    this.totalCorrect = summary.totalCorrect;
    this.overallAccuracy = summary.overallAccuracy;

    // Map für schnellen Zugriff pro Übung
    const perExerciseMap = new Map<number, ExerciseSummary>();
    summary.perExercise.forEach((ex) =>
      perExerciseMap.set(ex.exerciseId, ex)
    );

    // Trainingskarten befüllen
    this.trainingCards = this.baseCards.map((base) => {
      const stat = perExerciseMap.get(base.exerciseId);

      return {
        ...base,
        sessions: stat?.sessions ?? 0,
        bestAccuracy: stat?.bestAccuracy ?? 0,
        bestStreak: stat?.bestStreak ?? 0
      };
    });

    // Recent Activity
    this.recentActivities = summary.recentSessions.map(
      (s: RecentSessionSummary): RecentActivityView => {
        const base = this.baseCards.find(
          (c) => c.exerciseId === s.exerciseId
        );

        let iconName = base?.iconName ?? 'target';
        let colorClass = base?.colorClass ?? 'bg-cyan';

        return {
          id: s.id,
          modeName: s.exerciseName,
          iconName,
          colorClass,
          score: s.score,
          total: s.totalQuestions,
          accuracy: s.accuracy,
          streak: s.bestStreak,
          createdAt: s.createdAt
        };
      }
    );
  }

  onCardMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const { offsetX, offsetY } = event;
    card.style.setProperty('--x', `${offsetX}px`);
    card.style.setProperty('--y', `${offsetY}px`);
  }

  startTraining(mode: string): void {
    this.router.navigate(['/training', mode]);
  }
}
