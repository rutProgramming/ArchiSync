import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Course } from '../../Modules/Course';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CoursesServiceService } from '../../Services/CoursesService/courses-service.service';
import { map, catchError, of, forkJoin, switchMap } from 'rxjs';
import { UserService } from '../../Services/UserService/user.service';
import { LessonserviceService } from '../../Services/LessonService/lessonservice.service';
import { Lesson } from '../../Modules/Lesson';
import { clear, log } from 'node:console';

@Component({
  selector: 'app-course-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './course-form-component.component.html',
  styleUrl: './course-form-component.component.css'
})
export class CourseFormComponentComponent {
  action: string = "";
  courseId: string | undefined = undefined;
  lesson: Lesson = new Lesson('', '', '', '');
  course: Course = new Course('', '', '', '', []);
  courseForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    teacherId: new FormControl<string>('', [Validators.required], [this.teacherIdExistsValidator()]),
    lessons: new FormArray<FormGroup>([])
  });

  constructor(private CoursesService: CoursesServiceService, private route: ActivatedRoute, private router: Router, private userService: UserService, private lessonService: LessonserviceService) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id') || undefined;
      this.action=params.get('action') || 'add';
      console.log("courseId:", this.courseId);
      console.log("action",this.action);
     if (this.courseId) {
        this.action = 'update';
        this.loadCourseData(this.courseId);
      } else {
        this.action = 'add';
        this.createEmptyCourse();
      }
    });
  }

  createEmptyCourse(): void {
    this.CoursesService.addCourse(new Course('', '', '', '', [])).subscribe(course => {
      this.courseId = course.courseId;
      console.log("Empty course created with ID:", this.courseId);
    });
  }

  getlessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson(): void {
    const newLessonForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      lessonId: new FormControl<string | undefined>(undefined)
    });
  
    this.getlessons().push(newLessonForm);
  
    if (this.courseId) {
      this.lessonService.addLesson(this.courseId, this.lesson).subscribe(res => {
        console.log("API response for addLesson:", res); // Add this line
        newLessonForm.get('lessonId')?.setValue(res.id);
        console.log("Lesson added:", res);
        console.log("New lesson form:", newLessonForm);
        console.log("Lessons array:", this.getlessons());
      });
    }
  }

  removeLesson(index: number): void {
    const lessonId = this.getlessons().at(index).get('lessonId')?.value;
  
    if (this.courseId && lessonId) {
      this.lessonService.deleteLesson(this.courseId, lessonId).subscribe(() => {
        this.getlessons().removeAt(index);
        console.log("Lesson removed with ID:", lessonId, "at index:", index);
        console.log("Lessons form array after remove:", this.getlessons().value);
        console.log("load",this.courseId);
       this.loadCourseData(this.courseId!)
      });
    } else {
      this.getlessons().removeAt(index);
      console.log("Lesson removed (no ID) at index:", index);
      console.log("Lessons form array after remove:", this.getlessons().value);
    }
    
  }
  loadCourseData(id: string): void {
    this.CoursesService.getCourseById(id).subscribe(course => {
      this.courseForm.patchValue({
        title: course.title,
        description: course.description,
        teacherId: course.teacherId,
      });
  
      this.lessonService.getLessons(id).subscribe(lessons => {
        this.getlessons().clear();
        console.log("Lessons form array before load:", lessons);
        lessons.forEach(lesson => {
          console.log("Lesson data before FormGroup:", lesson);
          const lessonFormGroup = new FormGroup({
            title: new FormControl(lesson.title, Validators.required),
            content: new FormControl(lesson.content, Validators.required),
            lessonId: new FormControl<string | undefined>(lesson.id)
          });
          console.log("Lesson FormGroup created:", lessonFormGroup.value);
          this.getlessons().push(lessonFormGroup);
        });
        console.log("Course data loaded:", course);
        console.log("Lessons loaded:", lessons);
        console.log("Lessons form array after load:", this.getlessons().value);
      });
    });
  }
    send(): void {
    if (this.action === "add") {
      this.add();
    } else {
      this.update();
    }
  }

  private prepareCourseData(): Partial<Course> {
    return {
      title: this.courseForm.value.title ?? undefined,
      description: this.courseForm.value.description ?? undefined,
      teacherId: this.courseForm.value.teacherId ?? undefined,
    };
  }

  add(): void {
    console.log("Adding course",this.courseId);

    if (this.courseForm.valid&&this.courseId) {
      this.CoursesService.updateCourse(this.prepareCourseData(),this.courseId).subscribe(course => {
        this.courseId = this.courseId;
        this.saveLessons().then(success => {
          console.log( success , this.getlessons().length ,this.getlessons());

          if (success || this.getlessons().length == 0) {
            alert("Course added");
            this.router.navigate(['home/courses']);
          } else {
            alert("Can't add course");
          }
        }).catch(() => {
          alert("Can't add course");
        });
      });
    }
  }

  update(): void {
    console.log("Updating course with ID:", this.courseId);
    if (this.courseForm.valid && this.courseId) {
      this.CoursesService.updateCourse(this.prepareCourseData(), this.courseId).subscribe(() => {
        this.saveLessons().then(success => {
         console.log( success , this.getlessons().length ,this.getlessons());
          if (success || this.getlessons().length == 0) {
            alert("Course updated");
            this.router.navigate(['home/courses']);
          } else {
            alert("Can't update course");
          }
        }).catch(() => {
          alert("Can't update course");
        });
      }, (error) => {
        console.error("Error updating course:", error);
        alert("Can't update course");
      });
    }
  }

  teacherIdExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | any => {
      return this.userService.GetUserById(control.value).pipe(
        map(user => {
          return user ? null : { teacherIdNotExists: true };
        }),
        catchError(() => {
          return of({ teacherIdNotExists: true });
        })
      );
    };
  }

  saveLessons(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.courseId) {
        return reject(false);
      }
  
      const lessonObservables = this.getlessons().controls
        .filter(control => control.valid)
        .map(control => {
          const lessonId = control.get('lessonId')?.value;
          const lessonData = {
            title: control.value.title,
            content: control.value.content,
            courseId: this.courseId,
            lessonId: lessonId
          };
  
          if (lessonId) {
            console.log("Updating lesson with ID:", lessonId);
            return this.lessonService.putLesson(this.courseId!, lessonId, lessonData).pipe(
              catchError(err => {
                console.error("Error updating lesson:", err);
                return of(null);
              })
            );
          } else {
            console.log("Adding new lesson");
            return this.lessonService.addLesson(this.courseId!, lessonData).pipe(
              switchMap(res => {
                lessonData.lessonId = res.id;
                control.get('lessonId')?.setValue(res.id);
                console.log("New lesson added with ID:", res.id);
                return this.lessonService.putLesson(this.courseId!, res.id, lessonData);
              }),
              catchError(err => {
                console.error("Error adding lesson:", err);
                return of(null);
              })
            );
          }
        });
  
      if (lessonObservables.length === 0) {
        return resolve(true);
      }
  
      forkJoin(lessonObservables.filter(obs => obs !== null)).subscribe({
        next: () => {
          console.log("Lessons saved successfully");
          resolve(true);
        },
        error: (err) => {
          console.error('Error saving lessons:', err);
          reject(false);
        }
      });
    });
  }
}