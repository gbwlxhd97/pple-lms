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


export interface IQuestions {
  id: number;
  num: number;
  text: string;
  questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
}