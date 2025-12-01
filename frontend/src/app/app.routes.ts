// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';

// Make sure this matches your actual component class name (usually LandingComponent)
import { LandingComponent } from './pages/landing/landing';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SettingsComponent } from './pages/settings/settings';

import { SingleNoteComponent } from './pages/training/single-note/single-note';
import { ChordRecognitionComponent } from './pages/training/chord-recognition/chord-recognition';
import { PitchComparisonComponent } from './pages/training/pitch-comparison/pitch-comparison';
import { IntervalTrainingComponent } from './pages/training/interval-training/interval-training';

import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [

  // --- 1. THE "DOOR" (Landing Page) ---
  // This matches EXACTLY the root URL (localhost:4200/).
  // It is accessible to everyone.
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },

  // --- 2. AUTH ROUTES ---
  // Only for guests (not logged in).
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard]
  },

  // --- 3. MAIN APP ---
  // Protected by authGuard.
  // This handles URLs like /dashboard, /settings, etc.
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },

      { path: 'training/single-note', component: SingleNoteComponent },
      { path: 'training/chord-recognition', component: ChordRecognitionComponent },
      { path: 'training/pitch-comparison', component: PitchComparisonComponent },
      { path: 'training/interval-training', component: IntervalTrainingComponent },

      // Note: We removed the empty path redirect here because
      // the empty path '' is now handled by the Landing Page above.
    ]
  },

  // --- 4. FALLBACK ---
  // Redirect unknown URLs to the landing page
  { path: '**', redirectTo: '' }
];
