export interface AdminSummary {
  classes: number;
  teachers: number;
  totalStudents: number;
  [index: number]: {
    form: number;
    students: number;
  };
};
