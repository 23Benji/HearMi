// frontend/src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

// NEW: Toggle function
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        // Token speichern
        this.auth.saveToken(res.token);
        // Nach erfolgreichem Login weiterleiten
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = err?.error?.error ?? 'Login fehlgeschlagen';
        console.error(err);
      }
    });
  }


}
