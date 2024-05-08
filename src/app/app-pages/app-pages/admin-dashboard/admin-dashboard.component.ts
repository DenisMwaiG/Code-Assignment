import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../data/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  constructor(private apiService: AdminService) {}

  ngOnInit() {
    this.apiService.getSummary()
      .subscribe((items) => {
        console.log(items);
      });
    this.apiService.getLastResults()
      .subscribe((items) => {
        console.log(items);
      });
  }

}
