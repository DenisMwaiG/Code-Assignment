import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AdminSummary } from './types/Student.interface';
import { OverallExamSummary, StudentExamResult } from './types/Exam.interface';
import { StudentInfo } from './types/Student.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSummary(): Observable<AdminSummary> {
    return this.http.get<AdminSummary>('/admin-dashboard-summary')
      .pipe(shareReplay());
  }

  getLastResults(): Observable<OverallExamSummary[]> {
    return this.http.get<OverallExamSummary[]>('/admin/last-exam-performance')
      .pipe(shareReplay());
  }

  getClassPerformanceTrend(form: number): Observable<OverallExamSummary[]> {
    const params = new HttpParams().set('form', form.toString());
    return this.http.get<OverallExamSummary[]>('/class-performance-trend', {
      params,
    }).pipe(shareReplay());
  }

  getStudentByForm(form: number, stream: string): Observable<StudentInfo[]> {
    const params = new HttpParams()
      .set('form', form.toString())
      .set('stream', stream);

    return this.http.get<StudentInfo[]>('/class-students', {
      params,
    }).pipe(shareReplay());
  }

  getStudentPerformanceTrend(studentId: string): Observable<StudentInfo> {
    const params = new HttpParams().set('studentId', studentId);
    return this.http.get<StudentInfo>('/student-performance-trend', {
      params,
    }).pipe(shareReplay());
  }

  getStudentExamPerformance(studentId: string, examId: string): Observable<StudentExamResult > {
    const params = new HttpParams()
      .set('studentId', studentId)
      .set('examId', examId);
    return this.http.get<StudentExamResult >('/student-exam-performance', {
      params,
    }).pipe(shareReplay());
  }
}
