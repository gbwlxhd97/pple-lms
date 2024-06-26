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
  questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'SINGLE_CHOICE';
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
}


export interface IAnswerSurvey {
  surveyId: number;
  answerDtos:Array<{
    questionId: number,
    choiceIds: Array<number>,
    text: string
  }>
}