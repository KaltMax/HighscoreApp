import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientServiceService } from '../http-client-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;  // Für Hide/Show-Passwort-Button

  // Fehlermeldung wenn E-Mail oder Passwort nicht ausgefüllt sind
  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(
    private httpClientService: HttpClientServiceService,
    private router: Router
  ) {}

  login() {
    console.log('Login-attempt with E-Mail:', this.email, 'Password:', this.password);

    // Reset der Fehlermeldung
    this.showErrorMessage = false;
    this.errorMessage = '';

    // Überprüfung der Eingabefelder
    if (this.email === '' || this.password === '') {
      this.showErrorMessage = true;
      this.errorMessage = 'Bitte füllen Sie alle Felder aus!';
      console.log('Login failed');
      return;
    }

    this.httpClientService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token); // Das Token wird im LocalStorage gespeichert
        // Weiterleitung auf die Dashboard-Seite
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.showErrorMessage = true;
        this.errorMessage = 'E-Mail oder Passwort falsch!';
      }
    });
  }
}
