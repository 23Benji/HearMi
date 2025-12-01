// frontend/src/app/layouts/main-layout/main-layout.ts

import { Component, OnInit } from '@angular/core';
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
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = false;

  username: string | null = null;
  usernameInitial: string = 'U';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshUserInfo();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.auth.logout();               // Session leeren
    this.isSidebarOpen = false;
    this.username = null;
    this.usernameInitial = 'U';
    this.router.navigate(['/login']); // zurück zur Login-Seite
  }

  private refreshUserInfo(): void {
    this.username = this.auth.getUsername();
    if (this.username && this.username.length > 0) {
      this.usernameInitial = this.username.charAt(0).toUpperCase();
    } else {
      this.usernameInitial = 'U';
    }
  }
}
