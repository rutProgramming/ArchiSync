import { Component } from '@angular/core';
import { Course } from '../../Modules/Course';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../../Modules/User';
import { CommonModule } from '@angular/common';
import { CoursesServiceService } from '../../Services/CoursesService/courses-service.service';
import { UserDetailsService } from '../../Services/userDetailsService/user-details.service';
import { CapitalizePipe } from '../../pipes/capitalize-pipe.pipe';


@Component({
  standalone: true,
  selector: 'app-courses',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, RouterOutlet, CapitalizePipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses$: Observable<Course[]> | undefined;
  user: Partial<User> | undefined;
  flagAdd: boolean = false;
  constructor(private coursesService: CoursesServiceService, private userDetailsService: UserDetailsService, private router: Router) {
    this.courses$ = this.userDetailsService.getUser().pipe(
      switchMap(user => {
        this.user = user;
        return user.userId ? this.coursesService.getCoursesWithoutUserId(user.userId) : of([]);
      })
    )
  }
  joinToCourse(courseId: string) {
    this.userDetailsService.getUser().subscribe(user => {
      if (user.userId)
        this.coursesService.joinStudentToCourse(courseId, user.userId).subscribe(({
          next: (response) => {
            this.courses$ = user.userId ? this.coursesService.getCoursesWithoutUserId(user.userId) : of([]);
            this.router.navigate(['home/courses']);

          },
          error: () => {
            alert("can't join course")
          }
        }));

    });
  }

  deleteTheCourse(courseId: string) {
    this.coursesService.deleteCourse(courseId).subscribe({
      next: (response) => {
        if (this.user?.userId)
          this.courses$ = this.coursesService.getCoursesWithoutUserId(this.user.userId)
        this.router.navigate(['home/courses']);

      },
      error: () => {
        alert("can't delete course")
      }
    });
  }
  editTheCourse(courseId: string) {
    this.router.navigate(['courses', 'update', courseId]);
  }
  
  addNewCourse() {
    this.router.navigate(['courses', 'add']);
  }
}