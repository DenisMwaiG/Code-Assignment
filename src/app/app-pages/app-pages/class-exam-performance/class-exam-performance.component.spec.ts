import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassExamPerformanceComponent } from './class-exam-performance.component';

describe('ClassExamPerformanceComponent', () => {
  let component: ClassExamPerformanceComponent;
  let fixture: ComponentFixture<ClassExamPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassExamPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassExamPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
