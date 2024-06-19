export interface ISurvey {
  title: string;
  main: string;
}

export interface ISurveyTeacherList {
  id: number;
  num: number;
  title: string;
  description: string;
  createdAt: string;
  titleDetails?: {
    status?: string;
    endAt?: string;
  };
}
