// frontend/src/app/layouts/main-layout/main-layout.ts

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    LucideAngularModule,
    CommonModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  isSidebarOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.auth.logout();               // Session leeren
    this.isSidebarOpen = false;
    this.router.navigate(['/login']); // zurück zur Login-Seite
  }
}
