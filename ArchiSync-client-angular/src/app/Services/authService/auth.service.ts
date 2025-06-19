import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://archisync-production.up.railway.app/api/Auth/';

  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAuthenticated(): boolean {
    return this.getToken() != null;
  }
  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, { "userName": userName, "password": password });
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  // getUserId(): number | null {
  //   const token = this.getToken();
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.id;
  //   }
  //   return null;
  // }
}

