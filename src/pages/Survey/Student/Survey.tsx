import styles from './Survey.module.scss';
import Title from '@/components/common/Title/Title';
import Table4 from '@/components/common/Table4/Table4';
import { useParams } from 'react-router';
import surveyAPIList from '@/services/survey';
import { useEffect, useState } from 'react';
import { today } from '@/utils/date';

const SurveyStudentPage = () => {
  const { courseId } = useParams();
  const [surveyList,setSurveyList] = useState([]);
  const getSurveyList = async () => {
    try {
      const res = await surveyAPIList.getStudentSurveyList(Number(courseId));
      console.log(res);
      console.log(today(),"today");
      
      const updatedData = res.map((item:any) => ({
        ...item,
        isNew: item.createdAt === today(),
      }));
      console.log(updatedData);
      setSurveyList(updatedData);
    } catch (error) {
      
    }
  }
  useEffect(()=> {
    getSurveyList()

  },[])
  
  return (
    <>
      <Title title="설문" />
      <div className={styles.SurveyTable}>
        <Table4
          tableHead={['번호', '제목']}
          tableBody={surveyList || []}
          path={`/course/${courseId}/survey`}
        />
      </div>
    </>
  );
};

export default SurveyStudentPage;
