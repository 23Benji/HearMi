import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
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
  email: string = ''; // We can leave this empty or fetch if available

  private selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'User';
    this.usernameInitial = this.username.charAt(0).toUpperCase();

    // Ideally, you'd fetch the real email from the backend here if available
    this.email = 'user@example.com';

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
      if (!file.type.startsWith('image/')) { alert('Please select a valid image file.'); return; }
      if (file.size > 2 * 1024 * 1024) { alert('File is too large. Max 2MB.'); return; }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => this.profileImageUrl = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  removeAvatar(): void {
    if(!this.profileImageUrl) return;
    if(confirm('Are you sure you want to remove your profile picture?')) {
      this.userService.removeAvatar().subscribe({
        next: () => {
          this.profileImageUrl = null;
          this.selectedFile = null;
        },
        error: () => alert('Failed to remove profile picture.')
      });
    }
  }

  saveChanges(): void {
    // Only handles Avatar upload now since password change is removed
    if (this.selectedFile) {
      this.userService.uploadAvatar(this.selectedFile).subscribe({
        next: (res) => {
          this.profileImageUrl = res.avatarUrl;
          alert('Profile updated successfully!');
          this.selectedFile = null; // Clear selection
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload profile picture.');
        }
      });
    } else {
      // Nothing to save
      alert('No changes to save.');
    }
  }

  resetProgress(): void {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      this.userService.resetProgress().subscribe({
        next: () => alert('Your progress has been reset.'),
        error: (err) => {
          console.error(err);
          alert('Failed to reset progress.');
        }
      });
    }
  }

  deleteAccount(): void {
    const confirmed = prompt('Type "DELETE" to confirm account deletion. This action is irreversible.');
    if (confirmed === 'DELETE') {
      this.userService.deleteAccount().subscribe({
        next: () => {
          alert('Your account has been deleted.');
          this.authService.logout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete account.');
        }
      });
    }
  }
}
