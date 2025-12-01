// frontend/src/app/pages/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  // Username für "Welcome back"
  username: string | null = null;

  // Mock-Daten für Recent Activity (wie gehabt)
  recentActivities = [
    { id: 1, modeName: 'Interval Training', iconName: 'arrow-up-down', score: 0, total: 1, accuracy: 0, streak: 0, colorClass: 'bg-green' },
    { id: 2, modeName: 'Chord Recognition', iconName: 'music-2', score: 0, total: 1, accuracy: 0, streak: 0, colorClass: 'bg-purple' },
    { id: 3, modeName: 'Interval Training', iconName: 'arrow-up-down', score: 0, total: 1, accuracy: 0, streak: 0, colorClass: 'bg-green' },
    { id: 4, modeName: 'Single Note', iconName: 'music', score: 0, total: 2, accuracy: 0, streak: 0, colorClass: 'bg-cyan' },
    { id: 5, modeName: 'Single Note', iconName: 'music', score: 1, total: 1, accuracy: 100, streak: 1, colorClass: 'bg-cyan' }
  ];

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername();
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
