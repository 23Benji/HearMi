// frontend/src/app/layouts/main-layout/main-layout.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- **** ADD THIS LINE ****
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// 1. Just import the module itself. NO ICONS here.
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    // 2. Add ONLY the module name to the imports array.
    LucideAngularModule
  ],
  templateUrl: './main-layout.html', // I corrected the filename for you
  styleUrl: './main-layout.scss'   // I corrected the filename for you
})
export class MainLayoutComponent {
isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
