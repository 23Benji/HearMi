// frontend/src/app/pages/dashboard/dashboard.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// 1. Just import the module itself. NO ICONS here.
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    // 2. Add ONLY the module name to the imports array.
    LucideAngularModule
  ],
  templateUrl: './dashboard.html', // Corrected filename
  styleUrl: './dashboard.scss'   // Corrected filename
})
export class DashboardComponent {
  constructor(private router: Router) {}

  startTraining(mode: string): void {
    this.router.navigate(['/training', mode]);
  }
}
