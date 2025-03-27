// /types/index.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  resourceUrl: string;
  duration: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollment_date: string;
}

export interface NotificationType {
  show: boolean;
  message: string;
  type: "success" | "error";
}


export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
}