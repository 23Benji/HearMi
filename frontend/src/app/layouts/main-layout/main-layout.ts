import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-layout',
imports: [
    RouterOutlet,       // For the <router-outlet> placeholder
    RouterLink,         // For the [routerLink] directive on <a> tags
    RouterLinkActive    // For the [routerLinkActive] directive on <a> tags
  ],  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
