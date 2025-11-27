// frontend/src/app/services/audio.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext: AudioContext;

  private noteFrequencies: Map<string, number> = new Map([
    ['C', 261.63], ['C#', 277.18], ['D', 293.66], ['D#', 311.13],
    ['E', 329.63], ['F', 349.23], ['F#', 369.99], ['G', 392.00],
    ['G#', 415.30], ['A', 440.00], ['A#', 466.16], ['B', 493.88],
  ]);

  private chordIntervals: Map<string, number[]> = new Map([
    ['Major', [0, 4, 7]],
    ['Minor', [0, 3, 7]],
    ['Dominant 7', [0, 4, 7, 10]],
    ['Sus4', [0, 5, 7]],
    ['Power Chord', [0, 7]],
  ]);

  private intervalSemitones: Map<string, number> = new Map([
    ['Unison', 0], ['m2', 1], ['M2', 2], ['m3', 3], ['M3', 4],
    ['P4', 5], ['Tritone', 6], ['P5', 7], ['m6', 8], ['M6', 9],
    ['m7', 10], ['M7', 11], ['Octave', 12]
  ]);

  constructor() {
    this.audioContext = new AudioContext();
  }

  // --- PRIVATE HELPER FUNCTIONS ---

  private midiToFrequency(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private playFrequency(frequency: number, duration: number, volume: number = 0.5): void {
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // --- PUBLIC METHODS FOR COMPONENTS ---

  /**
   * FOR: Single Note Training
   * Plays a single musical note by its name.
   */
  public playNoteByName(noteName: string, duration: number = 2): void {
    const frequency = this.noteFrequencies.get(noteName);
    if (!frequency) {
      console.error(`Frequency not found for note: ${noteName}`);
      return;
    }
    this.playFrequency(frequency, duration);
  }

  /**
   * FOR: Chord Recognition
   * Plays a full chord based on its name.
   */
  public playChordByName(chordName: string, duration: number = 1): void {
    const intervals = this.chordIntervals.get(chordName);
    if (!intervals) {
      console.error(`Chord definition not found for: ${chordName}`);
      return;
    }
    const rootMidiNote = 60 + Math.floor(Math.random() * 8);
    intervals.forEach(interval => {
      const noteMidi = rootMidiNote + interval;
      const frequency = this.midiToFrequency(noteMidi);
      this.playFrequency(frequency, duration, 0.3); // Lower volume for chords
    });
  }

  /**
   * FOR: Pitch Comparison
   * Plays two notes sequentially with a delay between them.
   */
  public playNoteComparison(midiNote1: number, midiNote2: number, duration: number = 0.8, delay: number = 0.8): void {
    const freq1 = this.midiToFrequency(midiNote1);
    const freq2 = this.midiToFrequency(midiNote2);
    this.playFrequency(freq1, duration);
    setTimeout(() => {
      this.playFrequency(freq2, duration);
    }, delay * 1000);
  }

  /**
   * FOR: Interval Training
   * Plays an interval first harmonically (together), then melodically (one after another).
   */
  public playIntervalHarmonicAndMelodic(intervalName: string): void {
    const semitones = this.intervalSemitones.get(intervalName);
    if (semitones === undefined) {
      console.error(`Interval definition not found for: ${intervalName}`);
      return;
    }

    const harmonicDuration = 1;
    const pauseDuration = 400; // 400ms
    const melodicDuration = 0.5;
    const melodicDelay = 500; // 500ms

    const rootMidiNote = 60 + Math.floor(Math.random() * 8);
    const secondMidiNote = rootMidiNote + semitones;
    const freq1 = this.midiToFrequency(rootMidiNote);
    const freq2 = this.midiToFrequency(secondMidiNote);

    // 1. Play Harmonically
    this.playFrequency(freq1, harmonicDuration, 0.5);
    this.playFrequency(freq2, harmonicDuration, 0.5);

    // 2. Schedule Melodic part
    setTimeout(() => {
      this.playFrequency(freq1, melodicDuration, 0.5);
      setTimeout(() => {
        this.playFrequency(freq2, melodicDuration, 0.5);
      }, melodicDelay);
    }, (harmonicDuration * 1000) + pauseDuration);
  }
}
