import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = 'https://archisync-production.up.railway.app/api/Statistics';

  constructor(private http: HttpClient) {}

  getTotalProjects(): Observable<number> {
    
    return this.http.get<number>(`${this.baseUrl}/total-projects`);
  }

  getTotalFiles(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-files`);
  }
  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-users`);
  }
  getDailyLogins(): Observable<string[]> {
    var res= this.http.get<string[]>(`${this.baseUrl}/daily-logins`);
    res.subscribe(data => console.log("daily logins",res));
    return res;
  }

  getDailyProjects(): Observable<string[]> {
    var res= this.http.get<string[]>(`${this.baseUrl}/daily-projects`);
    res.subscribe(data => console.log("daily projects",res));
    return res;
  }

  getProjectTypeCounts(): Observable<{ isPublic: boolean, count: number }[]> {
    var res= this.http.get<{ isPublic: boolean, count: number }[]>(`${this.baseUrl}/projects-by-type`);
    res.subscribe(data => console.log("projects by type",res));
    return res;
  }
}
