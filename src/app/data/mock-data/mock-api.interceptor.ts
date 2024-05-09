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
import { mockDataGenerator } from './data-generator';
import { MOCK_DATA } from './data';

@Injectable(
  { providedIn: 'root' }
)
export class MockApiInterceptor implements HttpInterceptor {
  MOCK_DATA!: ReturnType<typeof mockDataGenerator>;
  constructor(private mockDataService: MockDataService) {
    // this.MOCK_DATA = mockDataGenerator();
    this.MOCK_DATA = MOCK_DATA as ReturnType<typeof mockDataGenerator>;
    // console.log({MOCK_DATA: this.MOCK_DATA});
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const endpoint = req.url;
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
      case '/class-performance-trend':
        const form = parseInt(params['form']);
        return of(
          new HttpResponse({
            status: 200,
            body: this.handleClassPerformanceTrend(form),
          })
        );
      case '/class-students':
        const parsedForm = parseInt(params['form']);
        const stream = params['stream'];
        return of(
          new HttpResponse({
            status: 200,
            body: this.handleClassStudents(parsedForm, stream),
          })
        );
      case '/student-performance-trend':
        const studentId = params['studentId'];
        return of(
          new HttpResponse({
            status: 200,
            body: this.handleStudentPerformanceTrend(studentId),
          })
        );
      case '/student-exam-performance':
        const id = params['studentId'];
        const examId = params['examId'];
        return of(
          new HttpResponse({
            status: 200,
            body: this.handleStudentExamPerformance(id, examId),
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
    const { classes, students } = this.MOCK_DATA;
    const detailedClassSummary = classes.map((data) => ({
      form: data.form,
      students: data.studentNo,
      summary: data.streamsInfo,
    }));
    return {
      teachers: 10,
      classes: 16,
      totalStudents: students.length,
      detailedClassSummary,
    };
  }

  private handleLastExamPerformance() {
    const { orderedExamsGroupedByForm } = this.MOCK_DATA;
    const lastExamInfo = Object.keys(orderedExamsGroupedByForm).map((form) => {
      const lastExam = orderedExamsGroupedByForm[form].slice(-1)[0];
      return lastExam;
    });
    return lastExamInfo;
  }

  private handleClassPerformanceTrend(form: number, stream?: string) {
    const { orderedExamsGroupedByForm } = this.MOCK_DATA;
    const classData = orderedExamsGroupedByForm[form];
    return classData;
  }

  private handleClassStudents(form: number, stream: string) {
    const { students } = this.MOCK_DATA;
    const streamData = students.filter(
      (student) => student.currentForm === form && student.stream === stream
    );
    return streamData;
  }

  private handleStudentPerformanceTrend(studentId: string) {
    const { students } = this.MOCK_DATA;
    const student = students.find((student) => student.id === studentId);
    return student || null;
  }

  private handleStudentExamPerformance(studentId: string, examId: string) {
    const { students } = this.MOCK_DATA;
    const student = students.find((student) => student.id === studentId);
    if (!student) {
      return null;
    }
    const exam = student.examResults.find((exam) => exam.id === examId);
    if (!exam) {
      return null;
    }
    return exam;
  }
}
