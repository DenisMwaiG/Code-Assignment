
const Subjects = ['Mathematics', 'English', 'Kiswahili', 'Physics', 'Chemistry', 'Biology', 'Computer Studies', 'Business Studies'];
export type Subject = typeof Subjects[number];
export type Grade = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'E';

export interface SubjectScore {
  subject: Subject;
  points: number;
  grade: Grade;
}

export interface StudentExamResult {
  id: string;
  name: string;
  form: number;
  year: number;
  examNumber: number;
  subjects: SubjectScore[];
  totalPoints: number;
  meanPoints: number;
  meanGrade: Grade;

  studentId: string;
  studentName: string;
  studentJoiningYear: number;
  stream: string;
}

export interface SubjectSummary {
  subject: string;
  totalPoints: number;
  meanPoints: number;
  grade: Grade;
}



export interface StreamResultSummary {
  stream: string;
  examName: string;
  totalPoints: number;
  meanPoints: number;
  grade: Grade;
  subjectSummary: SubjectSummary[];
  exams: StudentExamResult[];
};



export interface ExamSummary {
  form: number;
  examNumber: number;
  examName: string;
  totalPoints: number;
  meanPoints: number;
  grade: Grade;
  exams: StudentExamResult[];
  subjectSummary: SubjectSummary[];
}

export interface OverallExamSummary extends ExamSummary {
  streamResultsSummary: StreamResultSummary[];
}
