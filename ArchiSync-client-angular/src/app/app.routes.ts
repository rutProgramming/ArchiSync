import { Routes } from '@angular/router';
import { CoursesComponent } from './Components/courses/courses.component';
import { ConnectComponent } from './Components/connect/connect.component';
import { ShowCourseComponent } from './Components/show-course/show-course.component';
import { MyCoursesComponent } from './Components/my-courses/my-courses.component';
import { HomeComponent } from './Components/home/home.component';
import { CourseFormComponentComponent } from './Components/course-form-component/course-form-component.component';

export const routes: Routes = [
    { path: '', component: ConnectComponent },
    { 
        path: 'home', 
        component: HomeComponent, 
        children: [
            { 
                path: 'myCourses', 
                component: MyCoursesComponent,
                children: [
                    { path: ':id', component: ShowCourseComponent }
                ]
            },
            { 
                path: 'courses', 
                component: CoursesComponent, 
                children: [
                    { path: ':id', component: ShowCourseComponent }
                ]
            },
           
        ]

    },
    { path: 'courses/add', component: CourseFormComponentComponent },
    { path: 'courses/update/:id', component: CourseFormComponentComponent }
];
