import styles from './SurveyDetail.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button/Button';
import { Link, useParams } from 'react-router-dom';
import { useRouter } from '@/hooks/useRouter';
import toast from 'react-hot-toast';
import MultipleChoicePage from './MultipleChoice';
import ShortAnswerPage from './ShortAnswer';
import surveyAPIList from '@/services/survey';
import { IQuestions } from '@/interfaces/survey';

export interface ISurvey {
  id: number;
  title: string;
  description: string;
  endAt: string;
  questions: {
    id: number;
    num: number;
    text: string;
    questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
    choices?: {
      id: number;
      num: number;
      text: string;
    }[];
  }[];
}

const SurveyDetailPage = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState<any>({
    id: '',
    title: '',
    description: '',
    endAt: '',
    questions: [],
  });

  const getDetailSurvey = async () => {
    try {
      if (surveyId) {
        const res = await surveyAPIList.getDetailSurvey(parseInt(surveyId));
        console.log(res.data);
        setSurveyData(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDetailSurvey();
  }, []);

  const router = useRouter();

  //   const handlePost = async () => {
  //     try {
  //       const requestBody = {
  //         id: surveyData.id,
  //         title: surveyData.title,
  //         description: surveyData.description,
  //         endAt: surveyData.endAt
  //       };

  //       const response = await surveyAPIList.insertSurvey(courseId, requestBody);
  //       if (response) {
  //         toast.success('등록이 완료되었습니다.');
  //         router.back(1);
  //       }
  //     } catch (error) {
  //       toast.error('등록에 실패했습니다.');
  //       console.error(error);
  //     }
  //   };

  const isValidateButton = false;

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
      <div className={styles.Space}></div>
      {/* {renderQuestions()} */}
      {surveyData?.questions.map((question: IQuestions, idx: number) =>
        question.questionType === 'MULTIPLE_CHOICE' ? (
          <div key={question.id} className={styles.Survey}>
            <MultipleChoicePage
              questions={question}
              choices={question.choices}
            />
            <div className={styles.Space}></div>
          </div>
        ) : (
          <div key={question.id} className={styles.Survey}>
            <ShortAnswerPage question={question.text} />
            <div className={styles.Space}></div>
          </div>
        )
      )}
      <Button
        buttonType={isValidateButton ? 'Active' : 'Disabled'}
        className={styles.SubmitButton}
        //   onClick={handlePost}
      >
        완료
      </Button>
    </>
  );
};

export default SurveyDetailPage;
