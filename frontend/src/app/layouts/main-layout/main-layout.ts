import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'; // Import service

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
  avatarUrl: string | null = null; // Holds the live avatar URL

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshUserInfo();

    // 1. Initial Fetch
    this.userService.getAvatar().subscribe();

    // 2. Subscribe to updates (Live sync with Settings page)
    this.userService.avatar$.subscribe(url => {
      this.avatarUrl = url;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.auth.logout();
    this.isSidebarOpen = false;
    this.username = null;
    this.usernameInitial = 'U';
    this.router.navigate(['/login']);
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
