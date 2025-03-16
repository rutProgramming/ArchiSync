import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../Modules/Course';
import { Observable } from 'rxjs';
import { User } from '../../Modules/User';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../Modules/Lesson';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CoursesServiceService } from '../../Services/CoursesService/courses-service.service';
import { UserService } from '../../Services/UserService/user.service';
import { LessonserviceService } from '../../Services/LessonService/lessonservice.service';

@Component({
  imports: [CommonModule,MatCardModule,MatDivider  ],
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent  {
  course?: Course;
  teacher$!: Observable<User>;
  lessons$!: Observable<Lesson[]>;


  constructor(private coursesService: CoursesServiceService, private activatedRoute: ActivatedRoute, private userService: UserService,private lessonSevice: LessonserviceService) { 
      this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
            this.coursesService.getCourseById(id).subscribe(course => {
              this.course = course;
              if (this.course?.teacherId) {
                this.teacher$ = this.userService.GetUserById(this.course.teacherId);
              }
              if (this.course.id) {
                this.lessons$ = this.lessonSevice.getLessons(this.course.id);
              }
            })
        }
      })
  }

}