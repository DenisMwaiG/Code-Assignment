import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  items: any[] = [];

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    const params = new HttpParams().set('name', 'Item One');
    return this.http.get('/items', { params });
  }
}
