import { Component } from '@angular/core';
import { CoursesServiceService } from '../../Services/CoursesService/courses-service.service';
import { Course } from '../../Modules/Course';
import { UserDetailsService } from '../../Services/userDetailsService/user-details.service';
import { Observable, of, switchMap } from 'rxjs';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../Modules/User';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CapitalizePipe } from '../../pipes/capitalize-pipe.pipe';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, RouterOutlet,CapitalizePipe],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
  myCourses$: Observable<Course[]> | undefined;
  user$: Partial<User> | undefined;
  constructor(private coursesService: CoursesServiceService, private userDetailsService: UserDetailsService,private router: Router) {
    this.myCourses$ = this.userDetailsService.getUser().pipe(
      switchMap(user => {
        this.user$ = user;
        return user.userId ? this.coursesService.getCoursesByUserId(user.userId) : of([]);
      })
    )
  }
  leaveTheCourse(courseId: string) {
    this.userDetailsService.getUser().subscribe(user => {
      if (user.userId)
        this.coursesService.leaveCourse(courseId, user.userId).subscribe({
          next: () => {
            this.myCourses$ = user.userId ? this.coursesService.getCoursesByUserId(user.userId) : of([]);
            this.router.navigate(['home/myCourses']);

          },
          error: () => {
            alert("can't leave course")
          }
        });
    });
  }
}
