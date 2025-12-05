import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

import { authInterceptor } from './app/interceptors/auth.interceptor';

import {
  LucideAngularModule,
  LayoutDashboard,
  Music,
  Music2,
  GitCompare,
  Waves,
  LogOut,
  Target,
  Award,
  TrendingUp,
  ArrowUpDown,
  Flame,
  ListChecks,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Menu,
  X,
  Cog,
  Upload,
  SlidersHorizontal,
  ShieldCheck,
  AlertTriangle,
  RotateCw,
  Trash2,
  UserCircle,
  Piano,
  AudioWaveform,
  Guitar,
  SignalLow,
  SignalMedium,
  Signal,
  ArrowLeft,
  Eye,
  EyeOff,
  Check
} from 'lucide-angular';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard,
        Music,
        Music2,
        GitCompare,
        Waves,
        LogOut,
        Target,
        Award,
        TrendingUp,
        ArrowUpDown,
        Flame,
        ListChecks,
        CheckCircle2,
        XCircle,
        ArrowUp,
        ArrowDown,
        Minus,
        Menu,
        X,
        Cog,
        Upload,
        SlidersHorizontal,
        ShieldCheck,
        AlertTriangle,
        RotateCw,
        Trash2,
        UserCircle,
        Piano,
        AudioWaveform,
        Guitar,
        SignalLow,
        SignalMedium,
        Signal,
        ArrowLeft,
        Eye,
        EyeOff,
        Check
      })
    )
  ]
}).catch(err => console.error(err));
