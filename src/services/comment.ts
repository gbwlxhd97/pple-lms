import { requestAPI } from '@/utils/fetch';

const getStudentComments = async (courseId: number, studentId: number) => {
  const {data} = await requestAPI().get(
    `/comment/courses/${courseId}/students/${studentId}/comments`
  );
  return data;
};
/**
 * example body
 * {
  courseSectionId (차시 ID)
memberId (작성 대상 학생 ID)
main (본문)
}
 */
const insertComment = async (requestBody: { courseSectionId : number, memberId: number, main: string}) => {
  const data = await requestAPI().post('/comment/comment',requestBody);
  return data;
};

const getDetailCourseSectionComments = async (courseId:number,courseSectionId:number) => {
  const {data} = await requestAPI().get(`/comment/course/${courseId}/courseSections/${courseSectionId}/comments`)
  return data
}

const getNoCommentStudentList = async (courseSectionId:number) => {
  const {data} = await requestAPI().get(`/comment/${courseSectionId}/students/no-comment`)
  return data
}

const commentAPIList = {
  getStudentComments,
  insertComment,
  getDetailCourseSectionComments,
  getNoCommentStudentList
};

export default commentAPIList;
