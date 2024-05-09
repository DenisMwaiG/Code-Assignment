import { groupBy } from "lodash";
import { ExamSummary, Grade, OverallExamSummary, StreamResultSummary, StudentExamResult, SubjectScore } from "../types/Exam.interface";
import { StreamInfo, StudentInfo } from "../types/Student.interface";
import { generateUUID, gradesReference, studentFirstNames, studentLastNames, subjects } from "./mock-data-source";

export function mockDataGenerator() {
  // GENERATE DATA
  const classes = [];
  for (let form of [4, 3, 2, 1]) {
    const joiningYear = new Date().getFullYear() - (form - 1);
    const streamsInfo = getStreamInfo(form, joiningYear);
    const classSummary = {
      studentNo: streamsInfo.reduce((acc, stream) => acc + stream.students.length, 0),
      streamsInfo,
      form
    }
    classes.push(classSummary);
  }

  // GROUP IT FOR EASY API ACCESS
  const students = classes.map(c => c.streamsInfo.map(stream => stream.students).flat()).flat();

  const exams = classes.map(c => c.streamsInfo.map(stream => stream.students.map(student => student.examResults).flat()).flat()).flat();
  const orderedExamsGroupedByForm = getExamsSummary(exams);
  console.log({
    students,
    orderedExamsGroupedByForm
  });
  return {
    classes,
    students,
    orderedExamsGroupedByForm
  };
}

function getStreamInfo(form: number, joiningYear: number) {
  const streams = ['North', 'South', 'East', 'West'];
  const streamData: StreamInfo[] = [];
  for (let stream of streams) {
    streamData.push({
      form,
      stream,
      students: getStudents(form, stream, joiningYear)
    });
  }
  return streamData;
}


function getStudents(form: number, stream: string, joiningYear: number) {
  const students: StudentInfo[] = [];
  for (let i = 0; i < 2; i++) {
    students.push(getStudentData(form, stream, joiningYear));
  }
  return students;
}

interface StudentMetaData {
  studentId: string;
  studentName: string;
  stream: string;
  joiningYear: number;
  isAverage: boolean;
}

function getStudentData(currentForm: number, stream: string, joiningYear: number) {
  const firstName = studentFirstNames[Math.floor(Math.random() * studentFirstNames.length)];
  const lastName = studentLastNames[Math.floor(Math.random() * studentLastNames.length)];
  const isAverage = Math.random() > 0.7;
  const studentId = generateUUID();
  const studentName = `${firstName} ${lastName}`;
  const studentData: StudentMetaData = {
    studentId,
    studentName,
    stream,
    joiningYear,
    isAverage,
  }

  const studentInfo: StudentInfo = {
    id: generateUUID(),
    firstName,
    lastName,
    currentForm,
    stream,
    joiningYear,
    examResults: generateExamResults(currentForm, studentData),
  }

  return studentInfo;
}

function generateExamResults(currentForm: number, studentData: StudentMetaData) {
  const allExamResults: StudentExamResult[] = [];
  for (let i = 0; i < currentForm; i++) {
    const year = new Date().getFullYear() - i;
    const form = currentForm - i;

    const formResults = getFormResults(year, form, studentData);
    allExamResults.push(...formResults);
  }
  // remove the last 4 as they are yet to happen
  return allExamResults.slice(4);
}

function getFormResults(year: number, form: number, studentData: StudentMetaData) {
  const formResults: StudentExamResult[] = [];

  for (let term of [3, 2, 1]) {
    for (let exam of ['End of Term', 'Mid Term']) {
      const examName = `Form ${form} - ${exam} ${term} (${year})`;
      const subjectsScores = [];

      for (let subject of subjects) {
        subjectsScores.push(getSubjectScore(subject, studentData.isAverage));
      }

      const totalPoints = subjectsScores.reduce((acc, curr) => acc + curr.points, 0);
      const meanPoints = Math.round(totalPoints / subjectsScores.length);
      const meanGrade = getGrade(meanPoints);
      const examNumber = (6 - formResults.length) + ((form - 1) * 6);

      const examResult = {
        id: generateUUID(),
        name: examName,
        form,
        year,
        examNumber,
        subjects: subjectsScores,
        totalPoints,
        meanPoints,
        meanGrade,
        studentId: studentData.studentId,
        studentName: studentData.studentName,
        studentJoiningYear: studentData.joiningYear,
        stream: studentData.stream,
      }
      formResults.push(examResult);
    }
  }
  return formResults;
}

function getSubjectScore(subject: string, isAverage: boolean): SubjectScore {
  const pointsRange = isAverage ? [50, 85] : [70, 98];
  const points = Math.floor(Math.random() * (pointsRange[1] - pointsRange[0] + 1) + pointsRange[0]);
  const grade = getGrade(points);
  return { subject, points, grade };
}

function getGrade(points: number): Grade {
  const roundedPoints = Math.round(points);
  const range = gradesReference.find((grade) => roundedPoints >= grade.lowerLimit && roundedPoints <= grade.upperLimit);
  return range?.grade ?? 'E';
}

function getExamsSummary(exams: StudentExamResult[]): {[form: string]: OverallExamSummary[]} {
  const examsGroupedByForm = groupBy(exams, (exam) => `${exam.studentJoiningYear}`);
  const orderedExamsGroupedByForm = Object.keys(examsGroupedByForm).sort().reduce((acc, key) => {
    const joiningYear = parseInt(key);
    const currentForm = new Date().getFullYear() - joiningYear + 1;
    const formExams = examsGroupedByForm[key];
    const groupedFormExams = groupBy(formExams, (exam) => exam.examNumber);

    const summarizedFormExams = Object.keys(groupedFormExams).map((examNumber) => {
      const exams = groupedFormExams[examNumber];
      const examSummary = getExamSummary(exams);
      const streamResultsSummary = getStreamSummaryFromExamResults(exams);

      return {
        ...examSummary,
        streamResultsSummary,
        examNumber: parseInt(examNumber),
      }
    });

    acc[currentForm] = summarizedFormExams
    return acc;
  }, {} as {[form: string]: {
      form: number;
      examNumber: number;
      examName: string;
      totalPoints: number;
      meanPoints: number;
      grade: Grade;
      subjectSummary: { totalPoints: number; meanPoints: number; grade: Grade; subject: string; }[];
      exams: StudentExamResult[];
      streamResultsSummary: StreamResultSummary[];
    }[]
  });
  return orderedExamsGroupedByForm;
}

function getSubjectSummaryFromExamResults(exams: StudentExamResult[]) {
  const subjects = exams.map((exam) => exam.subjects).flat();
  const groupedSubjects = groupBy(subjects, (subject) => subject.subject);
  const subjectSummary = Object.keys(groupedSubjects).map((subject) => {
    const subjectScores = groupedSubjects[subject];
    return {
      ...getSubjectSummary(subjectScores),
      subject,
    };
  });
  return subjectSummary;
}

function getSubjectSummary(subjects: SubjectScore[]) {
  const totalPoints = subjects.reduce((acc, subject) => acc + subject.points, 0);
  const meanPoints = totalPoints / subjects.length;
  const grade = getGrade(meanPoints);
  return { totalPoints, meanPoints, grade };
}

function getExamSummary(exams: StudentExamResult[]): ExamSummary {
  const examName = exams[0].name;
  const examNumber = exams[0].examNumber;
  const form = exams[0].form;
  const totalPoints = exams.reduce((acc, exam) => acc + exam.meanPoints, 0);
  const meanPoints = totalPoints / exams.length;
  const grade = getGrade(meanPoints);
  const subjectSummary = getSubjectSummaryFromExamResults(exams);
  return {
    form,
    examName,
    examNumber,
    totalPoints,
    meanPoints,
    grade,
    subjectSummary,
    exams,
  };
}

function getStreamSummaryFromExamResults(exams: StudentExamResult[]): StreamResultSummary[] {
  const examsGroupedByStreams = groupBy(exams, (exam) => exam.stream);
  const streamSummary = Object.keys(examsGroupedByStreams).map((stream) => {
    const streamExams = examsGroupedByStreams[stream];
    return {
      stream,
      ...getExamSummary(streamExams),
    };
  });
  return streamSummary;
}
