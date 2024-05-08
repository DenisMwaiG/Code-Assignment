import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminSummary } from './types/ResponseTypes.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  items: any[] = [];

  constructor(private http: HttpClient) {}

  getSummary(): Observable<AdminSummary> {
    // const params = new HttpParams().set('name', 'Item One');
    return this.http.get<AdminSummary>('/admin-dashboard-summary');
  }

  getLastResults(): Observable<any> {
    return this.http.get('/admin/last-exam-performance');
  }
}
