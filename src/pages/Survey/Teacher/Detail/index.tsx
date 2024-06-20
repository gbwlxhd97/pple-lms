import surveyAPIList from '@/services/survey';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
const SurveyTeacherDetailPage = () => {
  const {surveyId} = useParams()
  const [surveyData,setSurveyData] = useState<any>()
  const getSurveyData = async () => {
      const res =await surveyAPIList.getDetailSurvey(Number(surveyId));
      console.log(res);
      setSurveyData(res.data);
  }
  useEffect(() => {
    getSurveyData();
  },[])
  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.SurveyDetail}>
          <h2>{surveyData.title}</h2>
          <div className={styles.Date}>
            <span className={styles.EndAt}>마감일 {surveyData.endAt}</span>
          </div>
        </div>
      </div>
    </>
  );
} 

export default SurveyTeacherDetailPage;