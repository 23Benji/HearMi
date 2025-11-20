// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';

// Import all the components your routes will use
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SingleNoteComponent } from './pages/training/single-note/single-note';
import { ChordRecognition } from './pages/training/chord-recognition/chord-recognition';
// ... import other training components when you create them

export const routes: Routes = [

  // --- AUTHENTICATION ROUTES ---
  // These routes load directly and DO NOT use the main sidebar layout.
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // --- MAIN APPLICATION ROUTES ---
  // These routes are children of the MainLayoutComponent,
  // meaning they will always be displayed WITH the sidebar.
  {
    path: '', // This acts as a parent for all main app routes
    component: MainLayout,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'training/single-note', component: SingleNoteComponent },
      { path: 'training/chord-recognition', component: ChordRecognition },
      // ... add paths for Pitch Comparison and Interval Training here

      // If the user navigates to the base URL (e.g., http://localhost:4200),
      // redirect them straight to the dashboard.
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // --- WILDCARD ROUTE ---
  // If the user types a URL that doesn't match anything above,
  // redirect them to the login page. This should be the VERY LAST route.
  { path: '**', redirectTo: 'login' }
];
