// frontend/src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import Router and RouterLink

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink], // Add RouterLink here
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  constructor(private router: Router) {}

  register() {
    // This is where you will call your authentication service to sign up the user
    console.log('Registering user...');

    // For now, we'll simulate a successful registration and navigate to the dashboard
    this.router.navigate(['/dashboard']);
  }
}
