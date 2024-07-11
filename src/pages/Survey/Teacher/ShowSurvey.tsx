import React, { useEffect, useState } from 'react';
import styles from './ShowSurvey.module.scss';
import ShortAnswerPage from '../ShortAnswer';
import { useParams } from 'react-router';
import { IQuestions } from '@/interfaces/survey';
import MultipleChoicePage from '../MultipleChoice';
import surveyAPIList from '@/services/survey';
/**
 * 
 * 선생님이 학생들의 설문을 개별로 보는 페이지이다.
 * @returns 
 */

const ShowSurveyPage = () => {
  const { surveyId,memberId } = useParams();
  const [surveyData, setSurveyData] = useState({
    id: '',
    title: '',
    description: '',
    endAt: '',
    questions: [],
  });
  const getShowSurveyDetail = async () => {
    const res = await surveyAPIList.getSurveyDetailStudent(Number(surveyId),Number(memberId));
    console.log(res);
    
  }

  useEffect(() => {
    getShowSurveyDetail()
  },[])
  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.SurveyDetail}>
          <h2>{surveyData?.title}</h2>
          <div className={styles.Date}>
            <span className={styles.EndAt}>마감일 {surveyData?.endAt}</span>
          </div>
        </div>
      </div>
      <div className={styles.Space}></div>
      {surveyData?.questions.map((question: IQuestions, idx: number) =>
        question.questionType === 'SINGLE_CHOICE' ||
        question.questionType === 'MULTIPLE_CHOICE' ? (
          <div key={question.id} className={styles.Survey}>
            객관식
            <div className={styles.Space}></div>
          </div>
        ) : (
          <div key={question.id} className={styles.Survey}>
            주관식
            <div className={styles.Space}></div>
          </div>
        )
      )}
    </>
  );
}

export default ShowSurveyPage