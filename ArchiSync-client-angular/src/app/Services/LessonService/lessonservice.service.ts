import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailsService } from '../userDetailsService/user-details.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../Modules/Lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonserviceService {

private apiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient, private userDetailsService: UserDetailsService) { }

  private getHeaders(): HttpHeaders {
    let token = this.userDetailsService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  
    getLessons(id: string): Observable<Lesson[]> {
      return this.http.get<Lesson[]>(`${this.apiUrl}/${id}/lessons`, { headers: this.getHeaders() });
    }
    addLesson(id:string,lesson:Partial<Lesson>): Observable<Lesson> {
      return this.http.post<Lesson>(`${this.apiUrl}/${id}/lessons`, lesson, { headers: this.getHeaders() });
    }
    putLesson(courseId: string, lessonId: string, lesson: Partial<Lesson>): Observable<Lesson> {
      return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers: this.getHeaders() });
    }
    deleteLesson(courseId:string,lessonId:string): Observable<Lesson> {
      return this.http.delete<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
    }
}
