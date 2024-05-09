import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent {
  @Input() title: string = '';
  @Input() xAxisLabels: string[] = [];
  @Input() seriesValues: {
    name: string;
    data: number[];
  }[] = [];

  chartOptions: EChartsOption = {};

  ngOnInit() {
    this.renderChart();
  }

  renderChart(): void {
    this.chartOptions = {
      title: {
        text: this.title,
      },
      xAxis: {
        type: 'category',
        data: this.xAxisLabels,
      },
      yAxis: {
        type: 'value',
      },
      series: this.seriesValues.map((series) => ({
        name: series.name,
        data: series.data,
        type: 'line',
      })),
      color: ["#43AB49"],
      legend: {
        data: this.xAxisLabels,
        textStyle: { color: "#858d98" },
        left: 20,
        bottom: 0,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross", crossStyle: { color: "#999" } },
      },
      grid: {
        zlevel: 0,
        borderWidth: 0,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,0,0,0)",
        top: 100,
        bottom: 60,
      },
    };
  }
}
