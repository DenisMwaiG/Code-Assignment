import { StudentExamResult } from "./Exam.interface";

export interface StudentInfo {
  id: string;
  firstName: string;
  lastName: string;
  currentForm: number;
  joiningYear: number;
  stream: string;
  examResults: StudentExamResult[];
}

export interface StreamInfo {
  form: number; // 1 - 4
  stream: string; // North, South, East, West
  students: StudentInfo[];
}
export interface AdminSummary {
  classes: number;
  teachers: number;
  totalStudents: number;
  detailedClassSummary: StreamInfo[];
};
