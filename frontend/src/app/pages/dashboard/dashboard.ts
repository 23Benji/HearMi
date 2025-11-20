// frontend/src/app/pages/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import the Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

  // 2. Inject the Router service into the component's constructor.
  // By making it 'private', it becomes a property of this class (this.router).
  constructor(private router: Router) {}


  /**
   * Navigates the user to the specific training page based on the mode provided.
   * This function is called from the (click) event in the dashboard.component.html file.
   * @param mode A string representing the training mode, e.g., 'single-note', 'chord-recognition'.
   */
  startTraining(mode: string): void {
    if (!mode) {
      console.error('Training mode is not specified!');
      return;
    }

    // 3. Use the router's navigate method to change the URL.
    // The path '/training/:mode' is what we defined in app.routes.ts.
    // For example, if 'mode' is 'single-note', it navigates to '/training/single-note'.
    this.router.navigate(['/training', mode]);
  }

}
