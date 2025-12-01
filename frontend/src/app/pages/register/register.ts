// frontend/src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular'; // <--- 1. Import Module


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false

  error = '';
  success = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  // NEW: Toggle functions
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  register() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.username || !this.password || !this.confirmPassword) {
      this.error = 'Bitte alle Felder ausfüllen.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    this.auth.register(this.email, this.username, this.password).subscribe({
      next: () => {
        this.success = 'Konto erstellt. Du kannst dich jetzt einloggen.';
        this.router.navigate(['/login']);
      },
      error: err => {
        this.error = err?.error?.error ?? 'Registrierung fehlgeschlagen.';
        console.error(err);
      }
    });
  }
}
