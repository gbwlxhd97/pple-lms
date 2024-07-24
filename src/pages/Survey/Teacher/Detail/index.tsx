import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import surveyAPIList from '@/services/survey';
import Title from '@/components/common/Title/Title';
import SurveyStudentTable from '@/components/common/SurveyStudentTable';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

const SurveyTeacherDetailPage = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState<any>();
  const [isSummary, setIsSummary] = useState(() => {
    const savedIsSummary = sessionStorage.getItem('isSummary');
    return savedIsSummary ? JSON.parse(savedIsSummary) : true;
  });
  const [students, setStudents] = useState([]);

  const getSurveyData = async () => {
    try {
      // 요약 데이터
      const summaryData = await surveyAPIList.getSurveySummaryList(
        Number(surveyId)
      );
      console.log(summaryData);
      setSurveyData(summaryData);
      // 개별보기 데이터
      const personalData = await surveyAPIList.getSurveyStudentList(
        Number(surveyId)
      );
      console.log(personalData);
      setStudents(personalData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSurveyData();
  }, [isSummary]);

  useEffect(() => {
    sessionStorage.setItem('isSummary', JSON.stringify(isSummary));
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
              onClick={() => setIsSummary(true)}
              className={`${styles.StudentChild} ${isSummary && styles.Active}`}
            >
              요약
            </div>
            <div
              onClick={() => setIsSummary(false)}
              className={`${styles.StudentChild} ${!isSummary && styles.Active}`}
            >
              개별보기
            </div>
          </div>
          {isSummary && (
            <div className={styles.SurveySpacing}>
              {surveyData?.questions?.map((item: any, i: number) => (
                <div className={styles.AnswerWrapper} key={i}>
                  <span className={styles.QuestionTitle}>Q{i + 1}.</span>
                  <span className={styles.ChartTextSpacingBottom}>
                    {item.text}
                  </span>
                  <div className={styles.AnswerTotalCount}>
                    답변 {item.answer_total}개
                  </div>
                  {item?.questionType === 'SINGLE_CHOICE' &&
                    item?.choices?.length > 0 && (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={item.choices}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="text" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  {item.questionType === 'SHORT_ANSWER' && item.answers && (
                    <div className={styles.ShortContainer}>
                      {item.answers?.map((answer: any, index: number) => (
                        <div key={index}>{answer}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isSummary && (
            <div className={styles.SurveySpacing}>
              <Title title={`설문 참여 학생 (${students.length})`} />
              <SurveyStudentTable
                tableHead={['iD', '이름']}
                tableBody={students}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SurveyTeacherDetailPage;
