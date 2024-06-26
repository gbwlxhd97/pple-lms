import { IAnswerSurvey } from '@/interfaces/survey';
import { requestAPI } from '@/utils/fetch';

type insertRequestBody = {
  id: number;
  title: string;
  description: string;
  endAt: string;
};

const insertSurvey = async (
  courseId: number,
  requestBody: insertRequestBody
) => {
  const data = await requestAPI().post(
    `/surveys/courses/${courseId}/survey`,
    requestBody
  );
  return data;
};

const getSurveyList = async (courseId: number) => {
  const { data } = await requestAPI().get(
    `/surveys/course/${courseId}/surveys`
  );
  return data;
};
/**
 * 학생들이 설문조사 상세페이지
 * @param surveyId 
 * @returns 
 */
const getDetailSurvey = async (surveyId: number) => {
  const {data} = await requestAPI().get(`/surveys/survey/${surveyId}`);
  return data;
};

const registerSurvey = async (courseId:number,body:any) => {
  const data = await requestAPI().post(`/surveys/courses/${courseId}/survey`,body)
  return data
}

const getStudentSurveyList = async (courseId: number) => {
  const {data} = await requestAPI().get(`/surveys/course/${courseId}/surveys`)
  return data
}

const answerSurvey = async (surveyId: number, requestBody: IAnswerSurvey) => {
  const data = await requestAPI().post(
    `/surveys/${surveyId}/answers`,
    requestBody
  );
  return data;
};

const surveyAPIList = {
  insertSurvey,
  getSurveyList,
  getDetailSurvey,
  registerSurvey,
  getStudentSurveyList,
  answerSurvey,
};

export default surveyAPIList;
