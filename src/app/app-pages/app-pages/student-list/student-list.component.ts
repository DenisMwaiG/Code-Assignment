import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../data/api.service';
import { StudentInfo } from '../../../data/types/Student.interface';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  classSummaries$!: Observable<any[]>;

  constructor(
    private apiService: ApiService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    const form = this.auth.userInfo?.form || '';
    const stream = this.auth.userInfo?.stream || '';
    const classSummaries$ = this.apiService.getStudentByForm(
      parseInt(form),
      stream
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
        title: 'Class',
        value: `${student.currentForm} ${student.stream}`,
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
