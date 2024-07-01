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
  index: number;
}

const ShortAnswerPage: React.FC<IinsertBody> = ({
  question,
  choices,
  setAnswer,
  index,
}) => {
  const router = useRouter();

  console.log(question, '주관식답');

  const handleTextChange = (questionId: number, text: string) => {
    setAnswer((prevAnswer) => {
      console.log(prevAnswer, 'prev');

      const updatedAnswerDtos = prevAnswer.answerDtos.map((answerDto: any) =>
        answerDto.id === questionId
          ? { ...answerDto, text, answerText: text }
          : answerDto
      );
      return { ...prevAnswer, answerDtos: updatedAnswerDtos };
    });
  };

  return (
    <div className={styles.SpacingWrapper}>
      <p className={styles.Question}>
        Q{index + 1}. {question.text}
      </p>
      <Input2
        name="shortanswer"
        type="text"
        placeholder="답변 입력"
        onChange={(e) => {
          handleTextChange(question.id, e.target.value);
        }}
      />
    </div>
  );
};

export default ShortAnswerPage;
