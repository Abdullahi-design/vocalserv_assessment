export interface Employee {
  id: number;
  name: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevel: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GradeLevel {
  id: number;
  name: string;
  description: string;
}

export interface FormData {
  name: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevel: string;
}

export interface GradeLevelForm {
  name: string;
  description: string;
}