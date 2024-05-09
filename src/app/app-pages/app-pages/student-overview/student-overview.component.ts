import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { orderBy } from 'lodash';
import { Router } from '@angular/router';
import { ApiService } from '../../../data/api.service';
import { StudentInfo } from '../../../data/types/Student.interface';
import { StudentExamResult } from '../../../data/types/Exam.interface';
import { TableItem } from '../../../shared/table/table.component';

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrl: './student-overview.component.scss'
})
export class StudentOverviewComponent {
  studentInfo$!: Observable<{
    title: string;
    value: string | number;
  }[]>;
  examList$!: Observable<any[]>;
  performanceTrend$!: Observable<{
    title: string;
    xAxisNames: string[];
    yAxisData: { name: string; data: number[] }[];
  }>;


  // State used to manage classes user is delving into
  pageTitle!: string;

  selectedData!: StudentExamResult;
  examResults!: StudentExamResult[];
  displayTitle!: string;
  displayedData!: TableItem[][];
  displayMode = 'subject';

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    const studentId = this.router.url.split('/')[2]
    const studentInfo$ = this.apiService.getStudentPerformanceTrend(studentId).pipe(filter(Boolean));
    this.studentInfo$ = studentInfo$.pipe(map(this.formatStudentInfo));
    this.examList$ = studentInfo$.pipe(map(this.formatExams));
    this.performanceTrend$ = studentInfo$.pipe(map(this.formatPerformanceTrend));
    studentInfo$.subscribe((data) => this.examResults = data.examResults);
  }

  private formatStudentInfo(student: StudentInfo) {
    return [
      { title: 'Student', value: `${student.firstName} ${student.lastName}` },
      { title: 'Class', value: `${student.currentForm} ${student.stream}` },
      { title: 'Join Year', value: student.joiningYear },
    ];
  }

  private formatPerformanceTrend(student: StudentInfo) {
    const title = `Performance Trend`;
    const ordered = orderBy(student.examResults, 'examNumber', 'asc');
    const xAxisNames = ordered.map((exam) => exam.name);
    const yAxisData = [{
      name: 'Mean Points',
      data: ordered.map((exam) => exam.meanPoints),
    }]
    return { xAxisNames, yAxisData, title };
  }

  private formatExams(student: StudentInfo) {
    return  student.examResults.map((exam) => ([
      {
        title: 'Exam',
        value: `${exam.name}`,
        type: 'text',
      },
      {
        title: 'Mean Grade',
        value: exam.meanGrade,
        type: 'text',
      },
      {
        title: 'Mean Point',
        value: exam.meanPoints,
        type: 'text',
      },
      {
        title: 'Total Points',
        value: exam.totalPoints,
        type: 'text',
      },
      {
        title: 'Action',
        value: 'View Details',
        type: 'link',
        link: `/student/${student.id}/exam/${exam.id}/performance`,
      }
    ]));
  }

  onChartEvent(event: string) {
    if (!this.examResults) return;
    const clickedData = this.examResults.find((p) => p.name === event);
    if (!clickedData) return;
    this.displayTitle = clickedData.name;
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

    this.displayedData = this.selectedData.subjects.map((s) => [
      {
        title: 'Subject', value: s.subject, type: 'text',
      },
      {
        title: 'Grade', value: s.grade, type: 'text',
      },
      {
        title: 'Points', value: `${s.points}`, type: 'text',
      },
    ]);
  }
}
