import { TestBed } from '@angular/core/testing';

import { LessonserviceService } from './lessonservice.service';

describe('LessonserviceService', () => {
  let service: LessonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
