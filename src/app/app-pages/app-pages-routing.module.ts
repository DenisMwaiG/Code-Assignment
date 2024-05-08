import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './app-pages/admin-dashboard/admin-dashboard.component';
import { ClassesListComponent } from './app-pages/classes-list/classes-list.component';
import { ClassOverviewComponent } from './app-pages/class-overview/class-overview.component';
import { ClassExamPerformanceComponent } from './app-pages/class-exam-performance/class-exam-performance.component';
import { StudentListComponent } from './app-pages/student-list/student-list.component';
import { StudentOverviewComponent } from './app-pages/student-overview/student-overview.component';
import { StudentExamPerformanceComponent } from './app-pages/student-exam-performance/student-exam-performance.component';

const AdminLevelRoutes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'class-list',
    component: ClassesListComponent
  },
];

const TeacherLevelRoutes: Routes = [
  {
    path: 'class/:class/overview',
    component: ClassOverviewComponent
  },
  {
    path: 'class/:class/exam/:exam/performance',
    component: ClassExamPerformanceComponent
  },
  {
    path: 'class/:class/students',
    component: StudentListComponent
  }
];

const StudentLevelRoutes: Routes = [
  {
    path: ':student/overview',
    component: StudentOverviewComponent
  },
  {
    path: ':student/exam/:exam/performance',
    component: StudentExamPerformanceComponent
  }
];

const routes: Routes = [
  {
    path: '',
    children: [...AdminLevelRoutes, ...TeacherLevelRoutes, ...StudentLevelRoutes]
  },
  {
    path: '',
    children: [...TeacherLevelRoutes, ...StudentLevelRoutes]
  },
  {
    path: '',
    children: StudentLevelRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPagesRoutingModule { }
