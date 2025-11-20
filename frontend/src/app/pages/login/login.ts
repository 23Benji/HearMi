// frontend/src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import Router and RouterLink
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule], // Add RouterLink here
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  constructor(private router: Router) {}

  login() {
    // This is where you will eventually call your authentication service (Supabase)
    console.log('Login attempt...');

    // For now, we'll just simulate a successful login and navigate to the dashboard
    this.router.navigate(['/dashboard']);
  }
}
