// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';

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
  // --- AUTH ROUTES (nur für NICHT eingeloggte User) ---
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

  // --- HAUPT-APP (nur für EINGELOGGTE User) ---
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

      // Base-URL → Dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // --- FALLBACK ---
  { path: '**', redirectTo: 'login' }
];
