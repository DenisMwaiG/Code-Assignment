import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ApiService } from '../../../data/api.service';
import { TableItem } from '../../../shared/table/table.component';
import { LineChartData } from '../../../shared/linechart/linechart.component';
import { OverallExamSummary } from '../../../data/types/Exam.interface';
import { UserRole } from '../../../data/types/Auth.interface';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrl: './class-overview.component.scss'
})
export class ClassOverviewComponent {

  adminSummary$!: Observable<{
    title: string;
    value: number;
  }[]>;

  classScores$!: Observable<TableItem[][]>;
  lastExamPerformances$!: Observable<LineChartData>;

  // State used to manage classes user is delving into
  lastExamPerformances!: OverallExamSummary[];
  form!: string;
  selectedData!: OverallExamSummary;
  displayTitle!: string;
  displayedData!: TableItem[][];
  displayMode: 'student' | 'subject' | 'stream' = 'subject';
  displayModes!: string[];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.router.url.split('/')[2];
    this.displayModes = this.authService.userInfo?.userRole === UserRole.Admin ? ['stream', 'subject'] : ['student', 'subject'];

    this.apiService.getClassPerformanceTrend(parseInt(this.form)).subscribe();

    const summary$ = this.apiService.getClassPerformanceTrend(parseInt(this.form)).pipe(filter(Boolean));
    this.classScores$ = summary$.pipe(map(this.formatClassSummaries));
    this.lastExamPerformances$ = summary$.pipe(map(this.formatPerformanceTrend));
    summary$.subscribe((data) => this.lastExamPerformances = data);
  }

  private formatPerformanceTrend(exams: OverallExamSummary[]) {
    const title = `Trend`;
    const xAxisNames = exams.map((exam) => `${exam.examName}`);
    const yAxisData = [{
      name: 'Mean Points',
      data: exams.map((score) => score.meanPoints),
    }]
    return { xAxisNames, yAxisData, title };
  }

  private formatClassSummaries(examScores: OverallExamSummary[]): TableItem[][] {
    return  examScores.reverse().map((score) => ([
      {
        title: 'Exam',
        value: `${score.examName}`,
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
    ]));
  }

  onChartEvent(event: string) {
    if (!this.lastExamPerformances) return;
    const clickedBar = this.lastExamPerformances.find((p) => event === `${p.examName}`);
    if (!clickedBar) return;
    this.selectedData = clickedBar;
    this.displayTitle = clickedBar.examName;
    this.setDisplayData();
  }

  toggleDisplayedData() {
    this.displayMode = this.displayModes.find((mode) => mode !== this.displayMode) as 'student' | 'subject' | 'stream';
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
    } else if (this.displayMode === 'subject') {
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
    } else {
      this.displayedData = this.selectedData.exams.map((s) => [
        {
          title: 'Student', value: s.studentName, type: 'text',
        },
        {
          title: 'Grade', value: s.meanGrade, type: 'text',
        },
        {
          title: 'Points', value: `${s.meanPoints}%`, type: 'text',
        },
      ]);
    }
  }}

