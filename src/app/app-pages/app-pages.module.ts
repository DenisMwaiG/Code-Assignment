import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPagesRoutingModule } from './app-pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './app-pages/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    SharedModule,
  ]
})
export class AppPagesModule { }
