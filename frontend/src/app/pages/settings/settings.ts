import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class SettingsComponent implements OnInit {
  // === Profile Section ===
  profileImageUrl: string | null = null;
  usernameInitial: string = '';
  username: string = '';
  email: string = 'email@test.com';

  private selectedFile: File | null = null;

  // === Security Section ===
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'User';
    this.usernameInitial = this.username.charAt(0).toUpperCase();

    this.userService.getAvatar().subscribe({
      next: (res) => {
        this.profileImageUrl = res.avatarUrl;
      },
      error: (err) => console.error('Could not load avatar', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.'); return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Please select an image under 2MB.'); return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => this.profileImageUrl = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  // New Method
  removeAvatar(): void {
    if(!this.profileImageUrl) return;

    if(confirm('Are you sure you want to remove your profile picture?')) {
      this.userService.removeAvatar().subscribe({
        next: () => {
          this.profileImageUrl = null;
          this.selectedFile = null;
          alert('Profile picture removed.');
        },
        error: (err) => alert('Failed to remove profile picture.')
      });
    }
  }

  saveChanges(): void {
    console.log('--- Saving Settings ---');

    // 1. Upload Avatar if selected
    if (this.selectedFile) {
      this.userService.uploadAvatar(this.selectedFile).subscribe({
        next: (res) => {
          this.profileImageUrl = res.avatarUrl;
          alert('Profile picture updated successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload profile picture.');
        }
      });
    }

    // 2. Password Change Logic
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
      console.log('Password change requested (TODO: Connect to backend).');
    }

    console.log('Updating username to:', this.username);

    if (!this.selectedFile) {
      alert('Settings saved!');
    }

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  resetProgress(): void {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      console.log('User confirmed progress reset.');
      alert('Your progress has been reset.');
    }
  }

  deleteAccount(): void {
    if (window.confirm('ARE YOU ABSOLUTELY SURE? This will permanently delete your entire account. This action cannot be undone.')) {
      console.log('User confirmed account deletion.');
      alert('Your account has been deleted.');
    }
  }
}
