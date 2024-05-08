import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminService } from '../../../data/api.service';

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
  lastExamPerformance$!: Observable<any>;

  constructor(private apiService: AdminService) {}

  ngOnInit() {
    this.adminSummary$ = this.apiService.getSummary().pipe(
      map((summary) => {
        return [
          { title: 'No. of Teachers', value: summary.teachers },
          { title: 'No. of Students', value: summary.totalStudents },
          { title: 'No. of Classes', value: summary.classes },
        ];
      })
    );
    this.lastExamPerformance$ = this.apiService.getLastResults()
      .pipe(
        map((lastExam) => {
          // Since it is sth like: Form 4 - End of Term 1
          const exam = lastExam[0].performance.examName.split(' - ').pop();
          const title = `Last Exam's Performance: ${exam}`;
          const ordered = lastExam.sort((a, b) => a.form - b.form);
          const xAxisNames = ordered.map((p) => `Form ${p.form}`);
          const yAxisData = [{
            name: 'Mean Points',
            data: ordered.map((p) => p.performance.meanPoints),
          }]
          return { xAxisNames, yAxisData, title };
        })
      );
  }
}
