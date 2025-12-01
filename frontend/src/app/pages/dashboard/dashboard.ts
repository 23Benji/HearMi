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

interface TrainingCardMeta {
  id: number;
  label: string;
  iconName: string;
  colorClass: string;
  routeSegment: string;
}

interface TrainingCardView extends TrainingCardMeta {
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
  total: number;
  accuracy: number;
  streak: number;
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
  username = '';

  totalSessions = 0;
  totalCorrect = 0;
  overallAccuracy = 0;

  trainingCards: TrainingCardView[] = [];
  recentActivities: RecentActivityView[] = [];

  loading = true;
  error = '';

  // Zuordnung der Exercises zu Routen / Icons / Farben
  private readonly baseCards: TrainingCardMeta[] = [
    {
      id: 1,
      label: 'Single Note',
      iconName: 'music',
      colorClass: 'bg-cyan',
      routeSegment: 'single-note'
    },
    {
      id: 2,
      label: 'Chord Recognition',
      iconName: 'music-2',
      colorClass: 'bg-purple',
      routeSegment: 'chord-recognition'
    },
    {
      id: 3,
      label: 'Pitch Comparison',
      iconName: 'git-compare',
      colorClass: 'bg-orange',
      routeSegment: 'pitch-comparison'
    },
    {
      id: 4,
      label: 'Interval Training',
      iconName: 'waves',
      colorClass: 'bg-green',
      routeSegment: 'interval-training'
    }
  ];

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername() ?? 'Musician';

    this.trainingService.getDashboardSummary().subscribe({
      next: (summary) => this.applySummary(summary),
      error: (err) => {
        console.error('Failed to load dashboard summary', err);
        this.error = 'Could not load stats. Please try again later.';
        this.loading = false;
      }
    });
  }

  private applySummary(summary: DashboardSummary): void {
    this.totalSessions = summary.totalSessions;
    this.totalCorrect = summary.totalCorrect;
    this.overallAccuracy = Math.round(summary.overallAccuracy);

    const byId = new Map<number, ExerciseSummary>();
    summary.perExercise.forEach((ex) => byId.set(ex.exerciseId, ex));

    this.trainingCards = this.baseCards.map((card) => {
      const stat = byId.get(card.id);
      return {
        ...card,
        sessions: stat?.sessions ?? 0,
        bestAccuracy: stat?.bestAccuracy ?? 0,
        bestStreak: stat?.bestStreak ?? 0
      };
    });

    this.recentActivities = summary.recentSessions.map(
      (session: RecentSessionSummary) => {
        const meta =
          this.baseCards.find((c) => c.id === session.exerciseId) ??
          ({
            id: session.exerciseId,
            label: session.exerciseName,
            iconName: 'music',
            colorClass: 'bg-cyan',
            routeSegment: 'single-note'
          } as TrainingCardMeta);

        return {
          id: session.id,
          modeName: meta.label,
          iconName: meta.iconName,
          colorClass: meta.colorClass,
          score: session.score,
          total: session.totalQuestions ?? 0,
          accuracy: session.accuracy ?? 0,
          streak: session.bestStreak ?? 0,
          createdAt: session.createdAt
        };
      }
    );

    this.loading = false;
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
