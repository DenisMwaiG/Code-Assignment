import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../data/api.service';
import { AdminSummary } from '../../../data/types/Student.interface';
import { TableItem } from '../../../shared/table/table.component';
import { BarChartData } from '../../../shared/barchart/barchart.component';
import { OverallExamSummary } from '../../../data/types/Exam.interface';

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

  classScores$!: Observable<TableItem[][]>;
  lastExamPerformances$!: Observable<BarChartData>;

  // State used to manage classes user is delving into
  lastExamPerformances!: OverallExamSummary[];
  displayTitle!: string;
  selectedData!: OverallExamSummary;
  displayedData!: TableItem[][];
  displayMode: 'stream' | 'subject' = 'stream';
  displayModes = ['stream', 'subject'];

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.adminSummary$ = this.apiService.getSummary().pipe(map(this.formatSchoolMetrics));

    const summary$ = this.apiService.getLastResults();
    this.classScores$ = summary$.pipe(map(this.formatClassSummaries));
    this.lastExamPerformances$ = summary$.pipe(map(this.formatLastExamData));
    summary$.subscribe((data) => this.lastExamPerformances = data);
  }

  private formatSchoolMetrics(summary: AdminSummary) {
    return [
      { title: 'Mean Grade', value: summary.teachers },
      { title: 'Mean Points', value: summary.totalStudents },
      { title: 'Total Points', value: summary.classes },
    ];
  }

  private formatLastExamData(lastExam: OverallExamSummary[]) {
    const exam = lastExam[0].examName.split(' - ').pop();
    const title = `Latest Performance - ${exam}`;
    const ordered = lastExam.sort((a, b) => b.form - a.form);
    const xAxisNames = ordered.map((p) => `Form ${p.form}`);
    const yAxisData = [{
      name: 'Mean Points',
      data: ordered.map((p) => p.meanPoints),
    }]
    return { xAxisNames, yAxisData, title };
  }

  private formatClassSummaries(classScores: OverallExamSummary[]): TableItem[][] {
    return  classScores.map((score) => ([
      {
        title: 'Class',
        value: `Form ${score.form}`,
        type: 'text',
      },
      {
        title: 'Student No.',
        value: `${score.exams.length}`,
        type: 'number',
      },
      {
        title: 'Mean Grade',
        value: score.grade,
        type: 'number',
      },
      {
        title: 'Mean Points',
        value: `${score.meanPoints}%`,
        type: 'number',
      },
      {
        title: 'Total Points',
        value: score.totalPoints,
        type: 'number',
      },
      {
        title: 'Action',
        value: 'View More',
        type: 'link',
        link: `/form/${score.form}/overview`,
      }
    ]));
  }

  // HANDLE INSPECTION OF CHART ELEMENTS //

  onChartEvent(event: string) {
    console.log(event);
    if (!this.lastExamPerformances) return;
    const clickedData = this.lastExamPerformances.find((p) => event === `Form ${p.form}`);
    if (!clickedData) return;
    this.displayTitle = clickedData.examName;
    this.selectedData = clickedData;
    this.setDisplayData();
  }

  toggleDisplayedData() {
    this.displayMode = this.displayMode === 'stream' ? 'subject' : 'stream';
    this.setDisplayData();
  }

  private setDisplayData() {
    if (!this.selectedData) {
      this.displayedData = [];
      return;
    };
    if (this.displayMode === 'stream') {
      this.displayedData = this.selectedData.streamResultsSummary.map((s) => [
        {
          title: 'Stream', value: s.stream, type: 'text',
        },
        {
          title: 'Grade', value: s.grade, type: 'text',
        },
        {
          title: 'Points', value: `${s.meanPoints}%`, type: 'text',
        },
      ])
    } else {
      this.displayedData = this.selectedData.subjectSummary.map((s) => [
        {
          title: 'Subject', value: s.subject, type: 'text',
        },
        {
          title: 'Grade', value: s.grade, type: 'text',
        },
        {
          title: 'Points', value: `${s.meanPoints}%`, type: 'text',
        },
      ]);
    }
  }

}

