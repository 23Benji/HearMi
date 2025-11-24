// frontend/src/app/pages/dashboard/dashboard.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Just import the module itself. The icons are provided globally in main.ts.
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './dashboard.html', // Note: Make sure your filename is correct
  styleUrl: './dashboard.scss'    // Note: Make sure your filename is correct
})
export class DashboardComponent {

  // =======================================================
  // VVV THIS IS THE NEW SECTION TO ADD VVV
  // =======================================================

  // This is mock data that simulates recent training sessions from a backend.
  // The @for loop in your HTML will iterate over this array.
  recentActivities = [
    { id: 1, modeName: 'Interval Training', iconName: 'arrow-up-down', score: 0, total: 1, accuracy: 0, streak: 0, colorClass: 'bg-green' },
    { id: 2, modeName: 'Chord Recognition', iconName: 'music-2', score: 0, total: 1, accuracy: 0, streak: 0, colorClass: 'bg-purple' },
    { id: 3, modeName: 'Interval Training', iconName: 'arrow-up-down', score: 0, total: 1, accuracy: 0, streak: 0, colorClass: 'bg-green' },
    { id: 4, modeName: 'Single Note', iconName: 'music', score: 0, total: 2, accuracy: 0, streak: 0, colorClass: 'bg-cyan' },
    { id: 5, modeName: 'Single Note', iconName: 'music', score: 1, total: 1, accuracy: 100, streak: 1, colorClass: 'bg-cyan' }
  ];

  // =======================================================
  // VVV END OF NEW SECTION VVV
  // =======================================================

  constructor(private router: Router) {}

  startTraining(mode: string): void {
    this.router.navigate(['/training', mode]);
  }
}
