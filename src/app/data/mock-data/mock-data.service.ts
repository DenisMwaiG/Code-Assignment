// src/app/mock-data.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class MockDataService {
  private items = [
    { id: 1, name: 'Item One', description: 'This is item one' },
    { id: 2, name: 'Item Two', description: 'This is item two' },
    { id: 3, name: 'Item Three', description: 'This is item three' },
  ];

  getItems(queryParams: any = {}): any[] {
    // Optionally filter items based on query parameters
    if (queryParams.name) {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(queryParams.name.toLowerCase())
      );
    }
    return this.items;
  }
}
