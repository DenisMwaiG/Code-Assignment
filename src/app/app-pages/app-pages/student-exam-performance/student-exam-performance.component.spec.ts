import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamPerformanceComponent } from './student-exam-performance.component';

describe('StudentExamPerformanceComponent', () => {
  let component: StudentExamPerformanceComponent;
  let fixture: ComponentFixture<StudentExamPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExamPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentExamPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
