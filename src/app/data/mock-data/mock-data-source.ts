import { Grade } from "../types/Exam.interface";

export const gradeLimits = {
  "A": { "upperLimit": 100, "lowerLimit": 93, "grade": "A" },
  "A-": { "upperLimit": 92, "lowerLimit": 90, "grade": "A-" },
  "B+": { "upperLimit": 89, "lowerLimit": 87, "grade": "B+" },
  "B": { "upperLimit": 86, "lowerLimit": 83, "grade": "B" },
  "B-": { "upperLimit": 82, "lowerLimit": 80, "grade": "B-" },
  "C+": { "upperLimit": 79, "lowerLimit": 77, "grade": "C+" },
  "C": { "upperLimit": 76, "lowerLimit": 73, "grade": "C" },
  "C-": { "upperLimit": 72, "lowerLimit": 70, "grade": "C-" },
  "D+": { "upperLimit": 69, "lowerLimit": 67, "grade": "D+" },
  "D": { "upperLimit": 66, "lowerLimit": 63, "grade": "D" },
  "D-": { "upperLimit": 62, "lowerLimit": 60, "grade": "D-" },
  "F": { "upperLimit": 59, "lowerLimit": 0, "grade": "F" }
};

export const streamNames = [
  'North',
  'South',
  'East',
  'West'
];

export const classes = [1, 2, 3, 4];

export const subjects = [
  'Mathematics',
  'English',
  'Kiswahili',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Studies',
  'Business Studies',
];

export const exams = [
  'End Term',
  'Mid Term',
]

export const gradesReference: {
  upperLimit: number;
  lowerLimit: number;
  grade: Grade;
}[] = [
  { upperLimit: 100, lowerLimit: 90, grade: "A" },
  { upperLimit: 89, lowerLimit: 85, grade: "A-" },
  { upperLimit: 84, lowerLimit: 80, grade: "B+" },
  { upperLimit: 79, lowerLimit: 75, grade: "B" },
  { upperLimit: 74, lowerLimit: 70, grade: "B-" },
  { upperLimit: 69, lowerLimit: 65, grade: "C+" },
  { upperLimit: 64, lowerLimit: 60, grade: "C" },
  { upperLimit: 59, lowerLimit: 55, grade: "C-" },
  { upperLimit: 54, lowerLimit: 50, grade: "D+" },
  { upperLimit: 49, lowerLimit: 45, grade: "D" },
  { upperLimit: 44, lowerLimit: 40, grade: "D-" },
  { upperLimit: 39, lowerLimit: 0, grade: "E" }
]

export function generateUUID() {
  return 'xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    const r = Math.random() * 16 | 0; // Random value between 0 and 15
    return r.toString(16); // Convert to hexadecimal
  });
}

export const studentFirstNames = [
  'John',
  'Mary',
  'James',
  'Paul',
  'Peter',
  'Joseph',
  'David',
  'Daniel',
  'Samuel',
  'Simon',
  'Stephen',
  'Michael',
  'Andrew',
  'Philip',
  'Thomas',
  'Matthew',
  'Mark',
  'Luke',
  'Timothy',
  'Titus',
  'Silas',
  'Barnabas',
  'Apollos',
  'Aristarchus',
  'Demas',
  'Epaphras',
  'Epaphroditus',
  'Erastus',
  'Gaius',
  'Jason',
];

export const studentLastNames = [
  "Amani",
  "Bahati",
  "Chiku",
  "Damali",
  "Elewa",
  "Furaha",
  "Gamba",
  "Haiba",
  "Imani",
  "Jiona",
  "Kamari",
  "Lulu",
  "Malkia",
  "Nahizi",
  "Ombeni",
  "Pendo",
  "Rafiki",
  "Shani",
  "Tumaini",
  "Uzuri",
  "Zuri",
  "Kibo",
  "Aziza",
  "Tamu",
  "Jabari",
  "Aisha",
  "Kunta",
  "Kwasi",
  "Nia",
  "Kondo",
  "Shamba",
  "Kiya",
  "Ajali",
  "Cheza",
  "Sawa",
  "Habari",
  "Upendo",
  "Baraka",
  "Taarab",
  "Mosi"
];
