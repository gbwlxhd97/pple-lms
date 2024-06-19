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

const getDetailSurvey = async (surveyId: number) => {
  const data = await requestAPI().get(`/surveys/survey/${surveyId}`);
  return data;
};

const surveyAPIList = {
  insertSurvey,
  getSurveyList,
  getDetailSurvey,
};

export default surveyAPIList;
