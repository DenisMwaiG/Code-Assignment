import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ApiService } from '../../../data/api.service';
import { StudentExamResult } from '../../../data/types/Exam.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-exam-performance',
  templateUrl: './student-exam-performance.component.html',
  styleUrl: './student-exam-performance.component.scss'
})
export class StudentExamPerformanceComponent {

  pageTitle!: string;
  adminSummary$!: Observable<{
    title: string;
    value: number | string;
  }[]>;

  lastExamPerformance$!: Observable<{
    title: string;
    xAxisNames: string[];
    yAxisData: { name: string; data: number[] }[];
  }>;

  classSummaries$!: Observable<any[]>;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    const url = this.router.url;
    const [x, studentId, y, examId] = url.split('/').slice(1);

    const exam$ = this.apiService.getStudentExamPerformance(studentId, examId).pipe(filter(Boolean));
    exam$.subscribe(exam => this.pageTitle = `${exam.studentName} | ${exam.name}`)

    this.adminSummary$ = exam$?.pipe(map(this.formatSchoolMetrics));
    this.lastExamPerformance$ = exam$?.pipe(map(this.formatSubjectScores));
    this.classSummaries$ = exam$?.pipe(map(this.formatClassSummaries));
  }

  private formatSchoolMetrics(exam: StudentExamResult) {
    return [
      { title: 'Mean Grade', value: exam.meanGrade as string },
      { title: 'Mean Points', value: exam.meanPoints },
      { title: 'Total Points', value: exam.totalPoints },
    ];
  }

  private formatSubjectScores(exam: StudentExamResult) {
    const title = `Performance per subject`;
    const xAxisNames = exam.subjects.map((s) => `${s.subject}`);
    const yAxisData = [{
      name: 'Mean Points',
      data: exam.subjects.map((s) => s.points),
    }]
    return { xAxisNames, yAxisData, title };
  }

  private formatClassSummaries(exam: StudentExamResult) {
    return  exam.subjects.map((subject) => ([
      {
        title: 'Subject',
        value: `${subject.subject}`,
        type: 'text',
      },
      {
        title: 'Mean Grade',
        value: subject.grade as string,
        type: 'text',
      },
      {
        title: 'Mean Points',
        value: subject.points,
        type: 'text',
      },
    ]));
  }
}

