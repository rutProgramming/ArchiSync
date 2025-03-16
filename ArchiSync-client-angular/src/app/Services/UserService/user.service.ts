import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../userDetailsService/user-details.service';
import { User } from '../../Modules/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:7034/api/Auth/";
 constructor(private http: HttpClient,private userDetailsService: UserDetailsService) { }
  private getHeaders(): HttpHeaders {
      let token= this.userDetailsService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
  signIn(item: Partial<User>): Observable<User>{
    console.log(item,`${this.apiUrl}login`);
    return this.http.post<User>(`${this.apiUrl}login`, item);
  }

  signUp(item: Partial<User>): Observable<User> {
    console.log(item,`${this.apiUrl}register`);
    return this.http.post<User>(`${this.apiUrl}register`, item); 
  }
  GetUserById(id: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, {headers: this.getHeaders()});
  }
  GetAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`, {headers: this.getHeaders()});
  }
}
