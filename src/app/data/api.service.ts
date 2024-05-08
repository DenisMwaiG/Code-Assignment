import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AdminSummary, ClassPerformance } from './types/ResponseTypes.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getSummary(): Observable<AdminSummary> {
    return this.http.get<AdminSummary>('/admin-dashboard-summary')
      .pipe(shareReplay());
  }

  getLastResults(): Observable<ClassPerformance[]> {
    return this.http.get<ClassPerformance[]>('/admin/last-exam-performance')
      .pipe(shareReplay());
  }
}
