import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../data/api.service';
import { AdminSummary } from '../../../data/types/ResponseTypes.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  classSummaries$!: Observable<any[]>;

  constructor(
    private apiService: AdminService,
  ) {}

  ngOnInit(): void {
    const summary$ = this.apiService.getSummary();
    this.classSummaries$ = summary$.pipe(map(this.formatClassSummaries));
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
        value: 'View Student',
        type: 'link',
        link: `/student/overview`,
      }
    ]));
  }
}
