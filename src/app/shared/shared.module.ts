import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';

import { SummaryCardComponent } from './summary-card/summary-card.component';
import { BarchartComponent } from './barchart/barchart.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { LinechartComponent } from './linechart/linechart.component';


@NgModule({
  declarations: [SummaryCardComponent, BarchartComponent, TableComponent, LinechartComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [
    SummaryCardComponent,
    BarchartComponent,
    TableComponent,
    LinechartComponent
  ]
})
export class SharedModule { }
