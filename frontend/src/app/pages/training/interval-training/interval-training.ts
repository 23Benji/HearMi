// frontend/src/app/pages/training/interval-training/interval-training.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { AudioService } from '../../../services/audio';
import { TrainingService } from '../../../services/training.service';
import { TrainingSession } from '../../../models/training-session';

@Component({
  selector: 'app-interval-training',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './interval-training.html',
  styleUrl: './interval-training.scss',
})
export class IntervalTrainingComponent implements OnInit {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  showFeedback = false;
  feedbackMessage = '';
  isCorrect: boolean | null = null;
  isAwaitingAnswer = false;

  // UI-State für Speichern
  isSaving = false;
  saveSuccess = '';
  saveError = '';

  intervals = ['Unison', 'm2', 'M2', 'm3', 'M3', 'P4', 'Tritone', 'P5', 'm6', 'M6', 'm7', 'M7', 'Octave'];
  correctAnswer: string | null = null;

  constructor(
    private audioService: AudioService,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void { this.generateNewQuestion(); }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.intervals.length);
    this.correctAnswer = this.intervals[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (this.isAwaitingAnswer || this.showFeedback || !this.correctAnswer) return;

    this.audioService.playIntervalHarmonicAndMelodic(this.correctAnswer);
    this.isAwaitingAnswer = true;
  }

  checkAnswer(selectedInterval: string): void {
    if (!this.isAwaitingAnswer) return;
    this.isAwaitingAnswer = false;
    this.questions++;

    if (selectedInterval === this.correctAnswer) {
      this.isCorrect = true;
      this.feedbackMessage = 'Excellent ear!';
      this.score++;
      this.streak++;
    } else {
      this.isCorrect = false;
      this.feedbackMessage = `Not quite. The interval was a ${this.correctAnswer}.`;
      this.streak = 0;
    }

    this.accuracy =
      this.questions > 0
        ? Math.round((this.score / this.questions) * 100)
        : 0;

    this.showFeedbackPopup();
  }

  showFeedbackPopup(): void {
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
      this.generateNewQuestion();
    }, 2500);
  }

  resetSession(): void {
    this.score = 0;
    this.accuracy = 0;
    this.streak = 0;
    this.questions = 0;
    this.isAwaitingAnswer = false;
    this.showFeedback = false;

    this.saveSuccess = '';
    this.saveError = '';

    this.generateNewQuestion();
  }

saveSession(): void {
    if (this.questions === 0) {
      this.saveError = 'No data to save yet.';
      setTimeout(() => this.saveError = '', 3000);
      return;
    }

    this.isSaving = true;
    this.saveSuccess = '';
    this.saveError = '';

    const session = new TrainingSession(
      4, 'Interval Training', this.score, this.questions, this.accuracy, this.streak
    );

    this.trainingService.saveSession(session).subscribe({
      next: () => {
        this.isSaving = false;
        this.saveSuccess = 'Session saved successfully 🎉';
        this.resetSession();
        setTimeout(() => this.saveSuccess = '', 3000);
      },
      error: (err) => {
        console.error('Error', err);
        this.isSaving = false;
        this.saveError = 'Could not save session.';
        setTimeout(() => this.saveError = '', 3000);
      }
    });
  }
}
