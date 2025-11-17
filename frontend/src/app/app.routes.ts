import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { Stats } from './components/stats/stats';

import { SingleNote } from './components/training/single-note/single-note';
import { Chord } from './components/training/chord/chord';
import { Pitch } from './components/training/pitch/pitch';
import { Interval } from './components/training/interval/interval';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard },

  { path: 'training/single', component: SingleNote },
  { path: 'training/chord', component: Chord },
  { path: 'training/pitch', component: Pitch },
  { path: 'training/interval', component: Interval },

  { path: 'stats', component: Stats },

  // Wildcard / fallback
  { path: '**', redirectTo: 'login' }
];
