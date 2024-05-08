import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() rows: {
      title: string;
      value: string | number;
      type: 'text' | 'number' | 'link';
      link?: string;
  }[][] = [];
  headers: string[] = [];

  ngOnInit() {
    if (this.rows.length > 0) {
      this.headers = this.rows[0].map((x) => x.title);
    }
  }
}
