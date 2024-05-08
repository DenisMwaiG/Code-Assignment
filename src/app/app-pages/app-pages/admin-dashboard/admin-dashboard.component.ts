import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../data/api.service';
import { map, Observable } from 'rxjs';

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
    this.apiService.getLastResults()
      .subscribe((items) => {
        console.log(items);
      });
  }

}
