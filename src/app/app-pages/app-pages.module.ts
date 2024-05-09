import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPagesRoutingModule } from './app-pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './app-pages/admin-dashboard/admin-dashboard.component';
import { ClassOverviewComponent } from './app-pages/class-overview/class-overview.component';
import { ClassExamPerformanceComponent } from './app-pages/class-exam-performance/class-exam-performance.component';
import { StudentExamPerformanceComponent } from './app-pages/student-exam-performance/student-exam-performance.component';
import { StudentListComponent } from './app-pages/student-list/student-list.component';
import { StudentOverviewComponent } from './app-pages/student-overview/student-overview.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ClassOverviewComponent,
    ClassExamPerformanceComponent,
    StudentExamPerformanceComponent,
    StudentListComponent,
    StudentOverviewComponent
  ],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    SharedModule,
  ]
})
export class AppPagesModule { }
