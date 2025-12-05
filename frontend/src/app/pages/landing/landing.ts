// frontend/src/app/pages/landing/landing.ts

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio'; // Import AudioService
import { LucideAngularModule } from 'lucide-angular'; // Import Icons if needed

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule, LucideAngularModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class LandingComponent implements OnInit {
  isLoggedIn = false;

  // --- Mini Game State ---
  gameStatus: 'start' | 'playing' | 'result' = 'start';
  gameMessage = '';
  isCorrect: boolean | null = null;
  private miniGameAnswer: string = '';

  constructor(private audioService: AudioService) {} // Inject Service

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    if (sessionStorage.getItem('hearmi_user_id') !== null) {
      this.isLoggedIn = true;
    }
  }

  // --- 1. Audio Previews on Hover ---
  playPreview(mode: string): void {
    // Prevent overlapping sounds by suspending/resuming if needed,
    // but for simple previews, fire-and-forget is usually okay.
    switch (mode) {
      case 'single':
        this.audioService.playNoteByName('C', 1);
        break;
      case 'chord':
        this.audioService.playChordByName('Major', 1);
        break;
      case 'pitch':
        this.audioService.playNoteComparison(60, 62, 0.5, 0.5); // C vs D
        break;
      case 'interval':
        this.audioService.playIntervalHarmonicAndMelodic('P5');
        break;
    }
  }

  // --- 2. Mini Challenge Logic ---
  startMiniGame(): void {
    this.gameStatus = 'playing';
    this.gameMessage = 'Listen carefully...';

    // Play two notes: 60 (C) and 64 (E) -> Second is Higher
    this.audioService.playNoteComparison(60, 64, 0.8, 0.8);
    this.miniGameAnswer = 'Higher';
  }

  replayMiniGame(): void {
    this.audioService.playNoteComparison(60, 64, 0.8, 0.8);
  }

  submitMiniGame(answer: string): void {
    this.gameStatus = 'result';
    if (answer === this.miniGameAnswer) {
      this.isCorrect = true;
      this.gameMessage = "Correct! You've got the ear.";
    } else {
      this.isCorrect = false;
      this.gameMessage = "Not quite. The second note was higher.";
    }
  }

  resetMiniGame(): void {
    this.gameStatus = 'start';
    this.gameMessage = '';
    this.isCorrect = null;
  }
}
