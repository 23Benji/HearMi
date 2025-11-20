// frontend/src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- 1. IMPORT IT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet // <-- 2. ADD IT BACK TO THE IMPORTS ARRAY
  ],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'frontend';
}
