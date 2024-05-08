import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor(private mockDataService: MockDataService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
}
