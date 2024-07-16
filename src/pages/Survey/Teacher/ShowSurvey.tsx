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
    name: ''
  });
  const getShowSurveyDetail = async () => {
    try {
      const res = await surveyAPIList.getSurveyDetailStudent(
        Number(surveyId),
        Number(memberId)
      );
      console.log(res);
      setSurveyData(res)
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    getShowSurveyDetail()
  },[])
  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.SurveyDetail}>
          <h2>{surveyData?.name}</h2>
          <div className={styles.Date}>
            <span className={styles.EndAt}>{surveyData?.title}</span>
          </div>
        </div>
      </div>
      <div className={styles.Space}></div>
      {surveyData?.questions.map((question: IQuestions, idx: number) =>
        question.questionType === 'SINGLE_CHOICE' ||
        question.questionType === 'MULTIPLE_CHOICE' ? (
          <div key={question.id} className={styles.Survey}>
            <MultipleChoicePage
              questions={question}
              choices={question.choices}
              index={idx}
              setAnswer={() => {}}
              isReadOnly={true}
            />
            <div className={styles.Space}></div>
          </div>
        ) : (
          <div key={question.id} className={styles.Survey}>
            {question.questionType === 'SHORT_ANSWER' && (
              <>
                <p className={styles.Question}>
                  Q{idx + 1}. {question.text}
                </p>
                <div className={styles.ShortContainer}>
                  {question.choices?.map((item: any, i: number) => (
                    <div>A: {item.text}</div>
                  ))}
                </div>
              </>
            )}
            <div className={styles.Space}></div>
          </div>
        )
      )}
    </>
  );
}

export default ShowSurveyPage