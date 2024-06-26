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
  const router = useRouter();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCheckBoxClick = (choiceId: number) => {
  };
  
  const handleChoiceChange = (questionId: number, choiceId: number) => {
    setSelectedAnswer(choiceId);
    setAnswer((prevAnswer) => {
      console.log(prevAnswer,choiceId,"prev");
      
      const updatedAnswerDtos = prevAnswer.answerDtos.map((answerDto:any) =>
        answerDto.id === questionId
          ? {
              ...answerDto,
              // choiceIds: answerDto.choiceIds.includes(choiceId)
              //   ? answerDto.choiceIds.filter((id) => id !== choiceId)
              //   : [...answerDto.choiceIds, choiceId],
              choiceIds: [choiceId]
            }
          : answerDto
      );
      console.log(updatedAnswerDtos,"updated");
      
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
