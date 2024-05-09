import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';

import { SummaryCardComponent } from './summary-card/summary-card.component';
import { BarchartComponent } from './barchart/barchart.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { LinechartComponent } from './linechart/linechart.component';
import { ChartDataComponent } from './chart-data/chart-data.component';

const components = [
  SummaryCardComponent,
  BarchartComponent,
  TableComponent,
  LinechartComponent,
  ChartDataComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [...components]
})
export class SharedModule { }
