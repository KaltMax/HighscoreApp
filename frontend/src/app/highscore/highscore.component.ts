import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientServiceService } from '../http-client-service.service';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'username', 'score'];
  dataSource: HighscoreElement[] = [];

  constructor(
    private httpClientService: HttpClientServiceService,
    private router: Router
  ) {}

  // Beim Initialisieren der Komponente werden die Highscores vom Server abgerufen
  ngOnInit() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.warn('No auth token found');
      return;
    }
  
    this.httpClientService.getHighscores(token).subscribe({
      next: (highscores: HighscoreElement[]) => {
        console.log('Highscores:', highscores);
        this.dataSource = highscores.map((score: HighscoreElement, index: number) => ({
          ...score,
          rank: index + 1
        }));
      },
      error: (error) => {
        console.error('Error fetching highscores:', error);
      }
    });
  }

  returnToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}

export interface HighscoreElement {
  rank: number;
  username: string;
  score: number;
}
