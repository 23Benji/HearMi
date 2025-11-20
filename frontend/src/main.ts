// frontend/src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app'; // <-- CORRECTED IMPORT
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, { // <-- CORRECTED COMPONENT NAME
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
