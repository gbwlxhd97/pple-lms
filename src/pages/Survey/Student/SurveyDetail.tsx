import styles from './SurveyDetail.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button/Button';
import { Link, useParams } from 'react-router-dom';
import { useRouter } from '@/hooks/useRouter';
import toast from 'react-hot-toast';
import ShortAnswerPage from '../ShortAnswer';
import surveyAPIList from '@/services/survey';
import { IAnswerSurvey, IQuestions } from '@/interfaces/survey';
import MultipleChoicePage from '../MultipleChoice';

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
/**
 * 학생들이 설문을 응답하는 페이지이다.
 * @returns 
 * 
 */
const SurveyDetailPage = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState({
    id: '',
    title: '',
    description: '',
    endAt: '',
    questions: [],
  });

  const [answer, setAnswer] = useState<IAnswerSurvey>({
    surveyId: Number(surveyId),
    answerDtos: [{
      questionId: 0,
      choiceIds:[],
      text: ''
    }],
  });
  const getDetailSurvey = async () => {
    try {
      const res = await surveyAPIList.getDetailSurvey(Number(surveyId));
      console.log(res);
      setSurveyData(res);
      setAnswer({
        surveyId: Number(surveyId),
        answerDtos: res.questions,
      });
    } catch (error) {}
  };

  useEffect(() => {
    getDetailSurvey();
  }, []);
  
  useEffect(() => {
    console.log(answer,"앤서의향연");
  },[answer])

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const requestBody = {
        surveyId: answer.surveyId,
        answerDtos: answer.answerDtos.map((a: any) => ({
          questionId: a.id,
          choiceIds: a.questionType === 'SINGLE_CHOICE' ? a.choiceIds : [],
          text: a.text,
        })),
      };

      const response = await surveyAPIList.answerSurvey(
        Number(surveyId),
        requestBody
      );
      if (response) {
        toast.success('등록이 완료되었습니다.');
        router.back(1);
      }
    } catch (error) {
      toast.error('등록에 실패했습니다.');
      console.error(error);
    }
  };

  const isValidateButton = true;

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
            <MultipleChoicePage
              questions={question}
              choices={question.choices}
              index={idx}
              setAnswer={setAnswer}
            />
            <div className={styles.Space}></div>
          </div>
        ) : (
          <div key={question.id} className={styles.Survey}>
            <ShortAnswerPage question={question} setAnswer={setAnswer} />
            <div className={styles.Space}></div>
          </div>
        )
      )}
      <Button
        buttonType={isValidateButton ? 'Active' : 'Disabled'}
        className={styles.SubmitButton}
        onClick={handleSubmit}
      >
        완료
      </Button>
    </>
  );
};

export default SurveyDetailPage;
