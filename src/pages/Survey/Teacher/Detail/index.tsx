import surveyAPIList from '@/services/survey';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { today } from '@/utils/date';
import SummaryChart from '@/components/common/SurveySummary/chart';
const SurveyTeacherDetailPage = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState<any>();
  const [isSummary, setIsSummary] = useState(true); //default
  const getSurveyData = async () => {
    try {
      if(isSummary) {
        const res = await surveyAPIList.getSurveySummaryList(Number(surveyId));
        console.log(res);
        setSurveyData(res);
      } else {
        const res = await surveyAPIList.getSurveyStudentList(Number(surveyId));
        console.log(res);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getSurveyData();
  }, [isSummary]);
  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.SurveyDetail}>
          <h2>{surveyData?.title}</h2>
          <div className={styles.Date}>
            <span className={styles.EndAt}>마감일 {surveyData?.endAt}</span>
          </div>
          <div className={styles.StudentFlexWrap}>
            <div
              onClick={() => {
                setIsSummary(true);
              }}
              className={`${styles.StudentChild} ${isSummary && styles.Active}`}
            >
              요약
            </div>
            <div
              onClick={() => {
                setIsSummary(false);
              }}
              className={`${styles.StudentChild} ${!isSummary && styles.Active}`}
            >
              개별보기
            </div>
          </div>
          {/* <SummaryChart title='' /> */}
        </div>
      </div>
    </>
  );
} 

export default SurveyTeacherDetailPage;