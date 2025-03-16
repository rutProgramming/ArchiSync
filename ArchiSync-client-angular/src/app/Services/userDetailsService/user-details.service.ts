import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../Modules/User';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userSubject = new BehaviorSubject<Partial<User>>(this.getUserFromSessionStorage());
  user$ = this.userSubject.asObservable();

  setUser(user: Partial<User>) {
    this.userSubject.next(user);
    this.saveUserToSessionStorage(user);
  }

  getUser(): Observable<Partial<User>> {
    return this.user$;
  }

  getToken(): string {
    return this.userSubject.getValue()?.token || '';
  }

  clearUser(): void {
    this.userSubject.next({ userId: '', name: '', email: '', password: '', role: '', token: '' });
    sessionStorage.removeItem('userData'); 
  }

  getUserFromSessionStorage(): any | null {
      return JSON.parse(sessionStorage.getItem('userData') || 'null');
    
  }
  saveUserToSessionStorage(user: any) {
      sessionStorage.setItem('userData', JSON.stringify(user));
  }
}
