import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserServer } from '../../Models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(private http: HttpClient) { }
  private apiUrl = 'https://archisync-production.up.railway.app/api/User/';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  addUser(user: UserServer): Observable<User> {
    return this.http.post<User>("https://archisync-production.up.railway.app/api/Auth/register", user);
  }

  updateUser(user: UserServer, id: number): Observable<User> {
    return this.http.put<User>(`${ this.apiUrl }${ id }`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }${ userId }`);
  }
}
