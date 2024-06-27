import styles from './MultipleChoice.module.scss';
import { useState, ChangeEvent } from 'react';
import { useRouter } from '@/hooks/useRouter';
import SingleCheckBox from '@/components/common/SingleCheckBox';
import { IAnswerSurvey } from '@/interfaces/survey';

interface IMultipleChoice {
  questions: {
    id: number;
    text: string;
  };
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
  index: number;
  setAnswer: React.Dispatch<React.SetStateAction<IAnswerSurvey>>;
}

const MultipleChoicePage: React.FC<IMultipleChoice> = ({
  questions,
  choices,
  index,
  setAnswer,
}) => {

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const handleChoiceChange = (questionId: number, choiceId: number) => {
    setSelectedAnswer(choiceId);
    setAnswer((prevAnswer) => {
      const updatedAnswerDtos = prevAnswer.answerDtos.map((answerDto:any) =>
        answerDto.id === questionId
          ? {
              ...answerDto,
              choiceIds: [choiceId]
            }
          : answerDto
      );
      return { ...prevAnswer, answerDtos: updatedAnswerDtos };
    });
  };

  return (
    <div className={styles.SpacingWrapper}>
      <p className={styles.Question}>
        Q{index + 1}. {questions.text}
      </p>
      {choices &&
        choices.map((choice) => (
          <SingleCheckBox
            key={choice.id}
            className={styles.CheckBox}
            checkBoxType={selectedAnswer === choice.id ? 'Active' : 'Default'}
            onClick={() => handleChoiceChange(questions.id,choice.id)}
          >
            {choice.text}
          </SingleCheckBox>
        ))}
    </div>
  );
};

export default MultipleChoicePage;
