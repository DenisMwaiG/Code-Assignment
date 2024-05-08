import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../data/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStudents()
      .subscribe((items) => {
        console.log(items);
      });
  }

}
