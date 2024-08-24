import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // Observable importieren, um die HTTP-Requests asynchron zu handlen 

@Injectable({
  providedIn: 'root'
})
export class HttpClientServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/sessions`, { username, password });
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete(`${this.baseUrl}/sessions`, { headers });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  createUser(username: string, password: string, company: string, address: { street: string, city: string, zip: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/signup`, { username, password, company, address });
  }

  getHighscores(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.baseUrl}/highscores`, { headers });
  }

  addHighscore(token: string, score: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${this.baseUrl}/highscores`, { score }, { headers });
  }
}
