import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../data/api.service';
import { AdminSummary, StudentInfo } from '../../../data/types/Student.interface';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  classSummaries$!: Observable<any[]>;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    console.log(url);
    const form = url.split('/')[2];
    const stream = url.split('/')[3];
    const classSummaries$ = this.apiService.getStudentByForm(
      parseInt(form),
      'North'
    );
    this.classSummaries$ = classSummaries$.pipe(map(this.formatClassSummaries));
  }

  private formatClassSummaries(students: StudentInfo[]) {
    return  students.map((student) => ([
      {
        title: 'Student Name',
        value: `${student.firstName} ${student.lastName}`,
        type: 'text',
      },
      {
        title: 'Stream',
        value: student.stream,
        type: 'text',
      },
      {
        title: 'Joining Year',
        value: student.joiningYear,
        type: 'text',
      },
      {
        title: 'Action',
        value: 'View Student',
        type: 'link',
        link: `/student/${student.id}/overview`,
      }
    ]));
  }
}
