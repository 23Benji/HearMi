// frontend/src/app/pages/settings/settings.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class SettingsComponent {
  // Profile Section
  profileImageUrl: string | ArrayBuffer | null = 'assets/images/default-avatar.png';
  private selectedFile: File | null = null;
  username: string = 'UserName';
  readonly email: string = 'email@test.com';

  // Training Preferences Section
  instruments = [
    { id: 'piano', name: 'Grand Piano', icon: 'piano' },
    // VVV THIS IS THE FIX VVV
    { id: 'sine', name: 'Sine Wave', icon: 'audioWaveform' }, // Changed 'sine-wave' to 'waveform'
    { id: 'guitar', name: 'Acoustic Guitar', icon: 'guitar' }
  ];
  selectedInstrument: string = 'piano';
  selectedDifficulty: string = 'medium';

  // Security Section
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor() {}

  // --- No changes to the functions below ---

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) { alert('Please select a valid image file.'); return; }
      if (file.size > 2 * 1024 * 1024) { alert('File is too large. Please select an image under 2MB.'); return; }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => this.profileImageUrl = e.target?.result || null;
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    console.log('--- Saving All Settings ---');
    const wantsToChangePassword = this.currentPassword || this.newPassword || this.confirmPassword;
    if (wantsToChangePassword) {
      if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
        alert('To change your password, please fill in all three password fields.');
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        alert('Your new passwords do not match. Please try again.');
        return;
      }
      console.log('Password change requested.');
      // TODO: Call backend service for password change.
    }
    if (this.selectedFile) {
      console.log('Uploading new profile picture:', this.selectedFile.name);
      // TODO: Call backend service for file upload.
    }
    console.log('Updating username to:', this.username);
    console.log('Updating instrument to:', this.selectedInstrument);
    console.log('Updating difficulty to:', this.selectedDifficulty);
    // TODO: Call backend service for preference updates.
    alert('Settings saved successfully! (Check the console for details)');
    this.currentPassword = ''; this.newPassword = ''; this.confirmPassword = '';
  }

  resetProgress(): void {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      console.log('User confirmed progress reset.');
      // TODO: Call backend service to reset progress.
      alert('Your progress has been reset.');
    }
  }

  deleteAccount(): void {
    if (window.confirm('ARE YOU ABSOLUTELY SURE? This will permanently delete your entire account. This action cannot be undone.')) {
      console.log('User confirmed account deletion.');
      // TODO: Call backend service to delete account.
      alert('Your account has been deleted.');
    }
  }
}
