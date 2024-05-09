import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export interface TableItem {
  title: string;
  value: string | number;
  type: 'number' | 'text' | 'link';
  link?: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {
  @Input() rows: TableItem[][] = [];
  headers: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const rows = changes['rows']?.currentValue;
    if (rows.length > 0) {
      this.headers = rows[0].map((x: { title: string; }) => x.title);
    }
  }
}
