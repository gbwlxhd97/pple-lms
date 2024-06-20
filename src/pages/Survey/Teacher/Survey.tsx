import styles from './Survey.module.scss';
import Title from '@/components/common/Title/Title';
import Table3 from '@/components/common/Table3/Table3';
import useProfileStore from '@/stores/useProfileStore';
import { useEffect, useState } from 'react';
import surveyAPIList from '@/services/survey';
import { ISurveyTeacherList } from '@/interfaces/survey';
import { useParams } from 'react-router';
import { today } from '@/utils/date';

const SurveyTeacherPage = () => {
  const {
    profile: { role },
  } = useProfileStore();

  const { courseId, surveyId } = useParams();

  const [surveyList, setSurveyList] = useState<Array<ISurveyTeacherList>>();

  const getSurveyList = async (courseId: number) => {
    try {
      const res = await surveyAPIList.getSurveyList(courseId);
      const updatedData = res.map((item: ISurveyTeacherList) => ({
        ...item,
        isNew: item.createdAt === today,
      }));
      console.log(res);
      
      console.log(updatedData);
      setSurveyList(updatedData);
    } catch (error) {}
  };

  useEffect(() => {
    if (courseId) {
      console.log('hihi');
      
      getSurveyList(parseInt(courseId));
    }
  }, [courseId]);

  return (
    <>
      <Title
        title="설문조사"
        isShowButton={role === 'TEACHER'}
        path={`/course/${courseId}/survey/edit`}
      />
      <div className={styles.SurveyTable}>
        <Table3
          tableHead={['제목', '날짜']}
          tableBody={surveyList || []}
          path={`/course/${courseId}/survey`}
        />
      </div>
    </>
  );
};

export default SurveyTeacherPage;
