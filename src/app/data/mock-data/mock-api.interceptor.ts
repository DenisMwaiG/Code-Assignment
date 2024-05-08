import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { last, Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';
import { mockDataGenerator } from './data-generator';

@Injectable(
  { providedIn: 'root' }
)
export class MockApiInterceptor implements HttpInterceptor {
  MOCK_DATA!: ReturnType<typeof mockDataGenerator>;
  constructor(private mockDataService: MockDataService) {
    this.MOCK_DATA = mockDataGenerator();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const endpoint = req.url;
    console.log(endpoint);
    const params: { [key: string]: string } = {};
    req.params.keys().forEach((key) => {
      params[key] = req.params.get(key) ?? '';
    });


    switch (endpoint) {
      case '/admin-dashboard-summary':
        return of(
          new HttpResponse({
            status: 200,
            body: this.handleAdminDashboardSummary(),
          })
        );
      case '/admin/last-exam-performance':
        return of(
          new HttpResponse({
            status: 200,
            body: this.handleLastExamPerformance(),
          })
        );
    }
    // Mock /api/items endpoint
    if (req.url.endsWith('/items')) {
      const params: { [key: string]: string } = {};
      req.params.keys().forEach((key) => {
        params[key] = req.params.get(key) ?? '';
      });

      const items = this.mockDataService.getItems(params);

      return of(new HttpResponse({ status: 200, body: items }));
    }

    // Otherwise, continue with the actual request
    return next.handle(req);
  }

  private handleAdminDashboardSummary() {
    const detailedClassSummary = this.MOCK_DATA.map((data) => ({
      form: data.form,
      students: data.studentNo,
      summary: data.streamsInfo,
      lastExamInfo: data.lastExamInfo,
    }));
    return {
      teachers: 10,
      classes: 16,
      totalStudents: detailedClassSummary.reduce((acc, data) => acc + data.students, 0),
      detailedClassSummary,
    };
  }

  private handleLastExamPerformance() {
    return this.MOCK_DATA.map((data) => {
      return {
        form: data.form,
        performance: data.lastExamInfo,
      };
    });
  }
}
