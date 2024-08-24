import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientServiceService } from '../http-client-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  company: string = 'FH Technikum Wien';
  street: string = '';
  city: string = '';
  zip: string = '';  // Ändere den Typ in string, um das Handling zu vereinfachen
  hidePassword: boolean = true;  // Für Hide/Show-Passwort-Button
  hideConfirmPassword: boolean = true;  

  // Fehlermeldung vorbereiten
  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(
    private httpClientService: HttpClientServiceService,
    private router: Router
  ) {}

  register() {
    this.showErrorMessage = false;
    this.errorMessage = '';

    // Überprüfung der Eingabefelder
    if (!this.email || !this.password || !this.confirmPassword || this.password.length < 8 || this.confirmPassword.length < 8) {
      this.errorMessage = 'Bitte füllen Sie alle Felder aus und stellen Sie sicher, dass das Passwort mindestens 8 Zeichen lang ist.';
      this.showErrorMessage = true;
      return;
    }

    // Überprüfung, ob die Passwörter übereinstimmen
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
      this.showErrorMessage = true;
      return;
    }

    const address = { street: this.street, city: this.city, zip: this.zip };

    // Senden der Registrierungsdaten an den Server
    this.httpClientService.createUser(this.email, this.password, this.company, address).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); // Navigieren zur Login-Seite
      },
      error: (error) => {
        console.log('Registration failed', error);
        this.errorMessage = 'Username already exists';
        this.showErrorMessage = true;
      }
    });
  }
}
