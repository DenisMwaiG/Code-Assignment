import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../data/api.service';
import { AdminSummary } from '../../../data/types/Student.interface';
import { OverallExamSummary } from '../../../data/types/Exam.interface';

@Component({
  selector: 'app-class-exam-performance',
  templateUrl: './class-exam-performance.component.html',
  styleUrl: './class-exam-performance.component.scss'
})
export class ClassExamPerformanceComponent {

  adminSummary$!: Observable<{
    title: string;
    value: number;
  }[]>;

  lastExamPerformance$!: Observable<{
    title: string;
    xAxisNames: string[];
    yAxisData: { name: string; data: number[] }[];
  }>;

  classSummaries$!: Observable<any[]>;

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    const summary$ = this.apiService.getSummary();
    this.adminSummary$ = summary$.pipe(map(this.formatSchoolMetrics));
    this.classSummaries$ = summary$.pipe(map(this.formatClassSummaries));

    this.lastExamPerformance$ = this.apiService.getLastResults()
      .pipe(map(this.formatLastExamData));

  }

    private formatSchoolMetrics(summary: AdminSummary) {
      return [
        { title: 'No. of Teachers', value: summary.teachers },
        { title: 'No. of Students', value: summary.totalStudents },
        { title: 'No. of Classes', value: summary.classes },
      ];
    }

    private formatLastExamData(lastExam: OverallExamSummary[]) {
      const exam = lastExam[0].examName.split(' - ').pop();
      const title = `Form 4 Performance in ${exam}`;
      const ordered = lastExam.sort((a, b) => a.form - b.form);
      const xAxisNames = ordered.map((p) => `${p.form}`);
      const yAxisData = [{
        name: 'Mean Points',
        data: ordered.map((p) => p.meanPoints),
      }]
      return { xAxisNames, yAxisData, title };
    }

    private formatClassSummaries(summary: AdminSummary) {
      const classSummaries = summary.detailedClassSummary;
      return  classSummaries.map((classSummary) => ([
        {
          title: 'Class/Student',
          value: `Class/Student ${classSummary.form}`,
          type: 'text',
        },
        {
          title: 'No. of Students',
          value: classSummary.students,
          type: 'number',
        },
        {
          title: 'Mean Grade',
          value: `A`,
          type: 'text',
        },
        {
          title: 'Action',
          value: 'View Student',
          type: 'link',
          link: `/student/exam/exam-1/performance`,
        }
      ]));
    }
}

