import styles from './ShortAnswer.module.scss';
import { useState, ChangeEvent } from 'react';
import { useRouter } from '@/hooks/useRouter';
import Input2 from '@/components/common/Input2/Input2';
import useProfileStore from '@/stores/useProfileStore';
import { IAnswerSurvey, IQuestions } from '@/interfaces/survey';

interface IinsertBody {
  question: IQuestions;
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
  setAnswer: React.Dispatch<React.SetStateAction<IAnswerSurvey>>;
}

const ShortAnswerPage: React.FC<IinsertBody> = ({
  question,
  choices,
  setAnswer,
}) => {
  const router = useRouter();

  console.log(question,"주관식답");
  

  const handleTextChange = (questionId: number, text: string) => {
    setAnswer((prevAnswer) => {
      console.log(prevAnswer,"prev");
      
      const updatedAnswerDtos = prevAnswer.answerDtos.map((answerDto:any) =>
        answerDto.id === questionId ? { ...answerDto, text } : answerDto
      );
      console.log(updatedAnswerDtos,"newDto");
      
      return { ...prevAnswer, answerDtos: updatedAnswerDtos };
    });
  };

  return (
    <div className={styles.SpacingWrapper}>
      <p className={styles.Question}>{question.text}</p>
      <Input2
        name="shortanswer"
        type="text"
        placeholder="답변 입력"
        onChange={(e) => {
          handleTextChange(question.id,e.target.value);
        }}
      />
    </div>
  );
};

export default ShortAnswerPage;
