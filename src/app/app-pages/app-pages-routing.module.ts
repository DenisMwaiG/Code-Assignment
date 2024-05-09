import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './app-pages/admin-dashboard/admin-dashboard.component';
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
];

const TeacherLevelRoutes: Routes = [
  {
    path: 'form/:form/overview',
    component: ClassOverviewComponent
  },
  {
    path: 'form/:form/exam/:exam/performance',
    component: ClassExamPerformanceComponent
  },
  {
    path: 'form/:form/students',
    component: StudentListComponent
  }
];

const StudentLevelRoutes: Routes = [
  {
    path: 'overview',
    component: StudentOverviewComponent
  },
  {
    path: 'exam/:exam/performance',
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
    path: 'student/:student',
    children: StudentLevelRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPagesRoutingModule { }
