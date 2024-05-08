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
  @Input() yAxisTitles: string[] = [];
  @Input() xAxisData: { name: string; data: number[] }[] = [];
  lineBarChart!: EChartsOption;

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const chartDom = document.getElementById('barChart')!;
    const chart = echarts.init(chartDom);

    const options: EChartsOption = {
      title: {
        text: this.title,
      },
      grid: {
        zlevel: 0,
        borderWidth: 0,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,0,0,0)",
        top: 100,
        bottom: 50,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross", crossStyle: { color: "#999" } },
      },
      color: ["#43AB49"],
      legend: {
        data: this.xAxisData.map((s) => s.name),
        textStyle: { color: "#858d98" },
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: this.yAxisTitles,
        axisPointer: { type: "shadow" },
        axisLine: { lineStyle: { color: "#858d98" } },
      },
      yAxis: {
        type: 'value',
      },
      series: this.xAxisData.map((param) => ({
        name: param.name,
        type: 'bar',
        data: param.data,
      })),
    };

    chart.setOption(options);
  }
}
