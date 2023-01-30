import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  // Do not show the Dialog initially.
  opened = false;

  constructor(private router: Router) {}

  close(): void {
    this.opened = false;
  }

  open(): void {
    this.opened = true;
  }

  logOut(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}
