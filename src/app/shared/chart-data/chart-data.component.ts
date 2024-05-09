import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TableItem } from '../table/table.component';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.scss'
})
export class ChartDataComponent {
  @Input() title!: string;

  @Input() displayedData!: TableItem[][];
  @Input() mode!: string;
  @Input() modes!: string[];
  @Output() onToggleMode = new EventEmitter<void>();
  otherMode!: string;

  ngOnChanges(changes: SimpleChanges) {
    const selectedMode = changes['mode']?.currentValue;
    if (selectedMode && this.modes?.length > 1) {
      this.otherMode = this.modes.find((m) => m !== selectedMode) || selectedMode;
    }
  }

}
