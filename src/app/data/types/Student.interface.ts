import { StudentExamResult } from "./Exam.interface";

export interface StudentInfo {
  id: string;
  firstName: string;
  lastName: string;
  currentForm: number;
  stream: string;
  examResults?: StudentExamResult[];
}

