import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminService } from '../../../data/api.service';
import { AdminSummary, ClassPerformance } from '../../../data/types/ResponseTypes.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

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
    private apiService: AdminService,
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

    private formatLastExamData(lastExam: ClassPerformance[]) {
      const exam = lastExam[0].performance.examName.split(' - ').pop();
      const title = `Last Exam's Performance: ${exam}`;
      const ordered = lastExam.sort((a, b) => a.form - b.form);
      const xAxisNames = ordered.map((p) => `Form ${p.form}`);
      const yAxisData = [{
        name: 'Mean Points',
        data: ordered.map((p) => p.performance.meanPoints),
      }]
      return { xAxisNames, yAxisData, title };
    }

    private formatClassSummaries(summary: AdminSummary) {
      const classSummaries = summary.detailedClassSummary;
      return  classSummaries.map((classSummary) => ([
        {
          title: 'Class',
          value: `Form ${classSummary.form}`,
          type: 'text',
        },
        {
          title: 'No. of Students',
          value: classSummary.students,
          type: 'number',
        },
        {
          title: 'Last Grade',
          value: `${classSummary.lastExamInfo.grade} (${classSummary.lastExamInfo.meanPoints}%)`,
          type: 'text',
        },
        {
          title: 'Action',
          value: 'View Performance Trend',
          type: 'link',
          link: `/form/${classSummary.form}/overview`,
        }
      ]));
    }
}

