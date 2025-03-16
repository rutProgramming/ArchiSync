import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponentComponent } from './course-form-component.component';

describe('CourseFormComponentComponent', () => {
  let component: CourseFormComponentComponent;
  let fixture: ComponentFixture<CourseFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
