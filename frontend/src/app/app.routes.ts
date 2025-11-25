//import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SingleNoteComponent } from './pages/training/single-note/single-note';
import { ChordRecognitionComponent } from './pages/training/chord-recognition/chord-recognition';
import { PitchComparisonComponent } from './pages/training/pitch-comparison/pitch-comparison';
import { IntervalTrainingComponent } from './pages/training/interval-training/interval-training';
import { SettingsComponent } from './pages/settings/settings'; // <-- IMPORT THE NEW COMPONENT


import { authGuard } from './guards/auth.guard';   // <--- NEU

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],          // <--- HIER GUARD DRAN
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'training/single-note', component: SingleNoteComponent },
      { path: 'training/chord-recognition', component: ChordRecognitionComponent },
      { path: 'training/pitch-comparison', component: PitchComparisonComponent },
      { path: 'training/interval-training', component: IntervalTrainingComponent },

      // If the user navigates to the base URL (e.g., http://localhost:4200),
      // redirect them straight to the dashboard.
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
