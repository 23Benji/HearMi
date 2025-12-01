// frontend/src/app/pages/landing/landing.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for @if

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class LandingComponent implements OnInit {
  isLoggedIn = false;

  constructor() {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    // 1. Check for Supabase session in LocalStorage
    // Note: Supabase usually saves keys starting with 'sb-'
    // We check for that OR a generic 'user' key if you set one manually.
    const supabaseSession = sessionStorage.getItem('sb-access-token'); // Example key
    const genericUser = sessionStorage.getItem('user'); // Example key

    // If either exists, we assume the user is logged in
    if (sessionStorage.getItem('hearmi_user_id')!== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
