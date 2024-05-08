import { Grade, StudentExamResult, SubjectScore } from "../types/Exam.interface";
import { StudentInfo } from "../types/Student.interface";
import { generateUUID, gradesReference, studentFirstNames, studentLastNames, subjects } from "./mock-data-source";

export interface StreamInfo {
  form: number; // 1 - 4
  stream: string; // North, South, East, West
  students: StudentInfo[];
}

export function mockDataGenerator() {
  const classes = [];
  for (let form of [4, 3, 2, 1]) {
    const streamsInfo = getStreamInfo(form);
    const classSummary = {
      lastExamInfo: getLastExamInfo(streamsInfo),
      studentNo: streamsInfo.reduce((acc, stream) => acc + stream.students.length, 0),
      streamsInfo,
      form
    }

    classes.push(classSummary);
  }
  return classes;
}

function getLastExamInfo(formData: StreamInfo[]) {
  const lastExamNo = formData[0].students[0].examResults
    ? formData[0].students[0].examResults[0].examNumber
    : 0;
  const lastExamPerformance = getFormPerformanceByExamNo(formData, lastExamNo);
  return lastExamPerformance;
}

function getStreamInfo(form: number) {
  const streams = ['North', 'South', 'East', 'West'];
  const streamData: StreamInfo[] = [];
  for (let stream of streams) {
    streamData.push({
      form,
      stream,
      students: getStudents(form, stream)
    });
  }
  return streamData;
}


function getStudents(form: number, stream: string) {
  const students: StudentInfo[] = [];
  for (let i = 0; i < 2; i++) {
    students.push(getStudentData(form, stream));
  }
  return students;
}

function getStudentData(currentForm: number, stream: string) {
  const firstName = studentFirstNames[Math.floor(Math.random() * studentFirstNames.length)];
  const lastName = studentLastNames[Math.floor(Math.random() * studentLastNames.length)];
  const isAverage = Math.random() > 0.7;

  const studentInfo: StudentInfo = {
    id: generateUUID(),
    firstName,
    lastName,
    currentForm,
    stream,
    examResults: generateExamResults(currentForm, isAverage),
  }

  return studentInfo;
}

function generateExamResults(currentForm: number, isAverage: boolean) {
  const allExamResults: StudentExamResult[] = [];
  for (let i = 0; i < currentForm; i++) {
    const year = new Date().getFullYear() - i;
    const form = currentForm - i;

    const formResults = getFormResults(year, form, isAverage);
    allExamResults.push(...formResults);
  }
  // remove the last 4 as they are yet to happen
  return allExamResults.slice(4);
}

function getFormResults(year: number, form: number, isAverage: boolean) {
  const formResults: StudentExamResult[] = [];

  for (let term of [3, 2, 1]) {
    for (let exam of ['End of Term', 'Mid Term']) {
      const examName = `Form ${form} - ${exam} ${term} (${year})`;
      const subjectsScores = [];

      for (let subject of subjects) {
        subjectsScores.push(getSubjectScore(subject, isAverage));
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
        meanGrade
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

/**
 * If stream is provided, only the performance of the specified stream will be calculated
 */
function getFormPerformanceByExamNo(streamsInfo: StreamInfo[], examNo: number, stream?: string) {
  let examName = '';

  // CALCULATE PERFORMANCE PER STREAM
  const streamsPerformance = streamsInfo.map((streamInfo) => {
    const students = stream ? streamInfo.students.filter((student) => student.stream === stream) : streamInfo.students;
    const scoreSummary = students.reduce((acc, student) => {
      const examResult = student.examResults?.find((result) => result.examNumber === examNo);
      if (examResult) {
        if (!examName) examName = examResult.name;
        acc.totalPoints += examResult.meanPoints;
        acc.totalStudents++;
        examResult.subjects.forEach((subject) => {
          const subjectIndex = acc.subjects.findIndex((s) => s.name === subject.subject);
          if (subjectIndex === -1) {
            acc.subjects.push({ name: subject.subject, totalPoints: subject.points });
          } else {
            acc.subjects[subjectIndex].totalPoints += subject.points;
          }
        });
      }
      return acc;
    }, { totalPoints: 0, totalStudents: 0, subjects: []} as {
      totalPoints: number;
      totalStudents: number;
      subjects: {name: string, totalPoints: number}[];
    });
    const meanPoints = scoreSummary.totalPoints / scoreSummary.totalStudents;
    const subjectsSummary = scoreSummary.subjects.map((subject) => {
      const meanPoints = subject.totalPoints / scoreSummary.totalStudents;
      return {
        subject: subject.name,
        points: meanPoints,
        grade: getGrade(meanPoints)
      }
    });
    return {
      stream: streamInfo.stream,
      meanPoints,
      grade: getGrade(meanPoints),
      subjectsSummary,
    }
  });

  // CALCULATE OVERALL FORM PERFORMANCE
  const overallFormPerformance = streamsPerformance.reduce((acc, stream) => {
    acc.totalPoints += stream.meanPoints;
    acc.totalStudents++;

    stream.subjectsSummary.forEach((subject) => {
      const subjectIndex = acc.subjectsSummary.findIndex((s) => s.subject === subject.subject);
      if (subjectIndex === -1) {
        acc.subjectsSummary.push({ subject: subject.subject, points: subject.points, grade: subject.grade });
      } else {
        acc.subjectsSummary[subjectIndex].points += subject.points;
      }
    });

    return acc;
  }, { totalPoints: 0, totalStudents: 0, subjectsSummary: [] as {subject: string, points: number, grade: Grade}[]});

  const meanPoints = overallFormPerformance.totalPoints / overallFormPerformance.totalStudents;
  const grade = getGrade(meanPoints);
  const subjectsSummary = overallFormPerformance.subjectsSummary.map((subject) => {
    const meanPoints = subject.points / overallFormPerformance.totalStudents;
    return {
      subject: subject.subject,
      points: meanPoints,
      grade: getGrade(meanPoints)
    }
  });

  return {
    examName,
    meanPoints,
    grade,
    subjectsSummary,
    streamsPerformance,
  }
}

function getGrade(points: number): Grade {
  const roundedPoints = Math.round(points);
  const range = gradesReference.find((grade) => roundedPoints >= grade.lowerLimit && roundedPoints <= grade.upperLimit);
  return range?.grade ?? 'E';
}
