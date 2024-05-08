export interface AdminSummary {
  classes: number;
  teachers: number;
  totalStudents: number;
  [index: number]: {
    form: number;
    students: number;
  };
};

interface SubjectSummary {
  subject: string;
  points: number;
  grade: string;
}

// Interface representing a stream's performance
interface StreamPerformance {
  stream: string;
  meanPoints: number;
  grade: string;
  subjectsSummary: SubjectSummary[];
}

// Interface representing overall performance information
interface Performance {
  examName: string;
  meanPoints: number;
  grade: string;
  subjectsSummary: SubjectSummary[];
  streamsPerformance: StreamPerformance[];
}

// Interface representing a single form's overall performance data
export interface ClassPerformance {
  form: number;
  performance: Performance;
}
