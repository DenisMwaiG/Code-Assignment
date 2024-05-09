import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminService } from '../../../data/api.service';
import { AdminSummary, ClassPerformance } from '../../../data/types/ResponseTypes.interface';

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrl: './student-overview.component.scss'
})
export class StudentOverviewComponent {

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
    this.classSummaries$ = summary$.pipe(map(this.formatClassSummaries));

    this.lastExamPerformance$ = this.apiService.getLastResults()
      .pipe(map(this.formatLastExamData));

  }

    private formatLastExamData(lastExam: ClassPerformance[]) {
      const exam = lastExam[0].performance.examName.split(' - ').pop();
      const title = `School Latest Performance - ${exam}`;
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
          title: 'Exam',
          value: `Exam ${classSummary.form}`,
          type: 'text',
        },
        {
          title: 'Mean Grade',
          value: `${classSummary.lastExamInfo.grade}`,
          type: 'text',
        },
        {
          title: 'Mean Point',
          value: `${classSummary.lastExamInfo.meanPoints}%`,
          type: 'text',
        },
        {
          title: 'Total Points',
          value: `${classSummary.lastExamInfo.grade} (${classSummary.lastExamInfo.meanPoints}%)`,
          type: 'text',
        },
        {
          title: 'Action',
          value: 'View Exam',
          type: 'link',
          link: `/exam/exam/performance`,
        }
      ]));
    }
}
