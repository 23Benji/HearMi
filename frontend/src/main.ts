// frontend/src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

// VVV CORRECTED MODULE NAME HERE VVV
import {
  LucideAngularModule, // This was incorrectly named 'LucideIconsModule' before
  LayoutDashboard,
  Music,
  Music2,
  GitCompare,
  Waves,
  LogOut,
  Target,
  Award,
  TrendingUp,
  ArrowUpDown
} from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    importProvidersFrom(
      // VVV AND CORRECTED MODULE NAME HERE VVV
      LucideAngularModule.pick({ // This was also incorrect
        LayoutDashboard,
        Music,
        Music2,
        GitCompare,
        Waves,
        LogOut,
        Target,
        Award,
        TrendingUp,
        ArrowUpDown
      })
    )
  ]
}).catch(err => console.error(err));
