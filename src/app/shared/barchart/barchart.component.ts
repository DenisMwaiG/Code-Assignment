import { Component, Input } from '@angular/core';
import { EChartsOption } from "echarts";
import * as echarts from 'echarts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.scss'
})
export class BarchartComponent {
  @Input() title!: string;
  @Input() xAxisLabels: string[] = [];
  @Input() seriesValues: { name: string; data: number[] }[] = [];
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    this.chartOptions = {
      title: {
        text: this.title,
      },
      legend: {
        data: this.seriesValues.map((s) => s.name),
        textStyle: { color: "#858d98" },
        left: 20,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: this.xAxisLabels,
        axisPointer: { type: "shadow" },
        axisLine: { lineStyle: { color: "#858d98" } },
      },
      yAxis: {
        type: 'value',
      },
      series: this.seriesValues.map((param) => ({
        name: param.name,
        type: 'bar',
        data: param.data,
      })),
      grid: {
        zlevel: 0,
        borderWidth: 0,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,0,0,0)",
        top: 100,
        bottom: 60,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross", crossStyle: { color: "#999" } },
      },
      color: ["#43AB49"],
    };
  }
}
