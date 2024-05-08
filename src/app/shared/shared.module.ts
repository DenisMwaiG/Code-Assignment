import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';

import { SummaryCardComponent } from './summary-card/summary-card.component';
import { BarchartComponent } from './barchart/barchart.component';


@NgModule({
  declarations: [SummaryCardComponent, BarchartComponent],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [
    SummaryCardComponent,
    BarchartComponent,
  ]
})
export class SharedModule { }
