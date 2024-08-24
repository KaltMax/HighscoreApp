import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientServiceService } from '../http-client-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  highscore: number = 0;

  constructor(
    private httpClientService: HttpClientServiceService,
    private router: Router
  ) {}

  logout() {
    console.log('Logout');
  
    const token = localStorage.getItem('authToken'); // Get the token
    if (!token) {
      console.log('No token found, navigating to login');
      this.router.navigate(['/login']);
      return;
    }
  
    this.httpClientService.logout(token).subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('authToken'); // Token löschen
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  showHighscore() {
    this.router.navigate(['/highscore']);
  }

  submitHighscore(highscore: number) {
    if (highscore <= 0) {
      console.log('Invalid highscore');
      return;
    }
    const token = localStorage.getItem('authToken'); // Get the token
    if (!token) {
      console.log('No token found, navigating to login');
      this.router.navigate(['/login']);
      return;
    }
  
    this.httpClientService.addHighscore(token, highscore).subscribe({
      next: () => {
        console.log('Highscore submitted successfully');
        this.router.navigate(['/highscore']);
      },
      error: (error) => {
        console.error('Failed to submit highscore', error);
      }
    });
  }
}
