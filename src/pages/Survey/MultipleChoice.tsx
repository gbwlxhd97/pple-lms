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
    selected?: boolean;
  }[];
  index: number;
  setAnswer: React.Dispatch<React.SetStateAction<IAnswerSurvey>>;
  isReadOnly?: boolean;
}

const MultipleChoicePage: React.FC<IMultipleChoice> = ({
  questions,
  choices,
  index,
  setAnswer,
  isReadOnly,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleChoiceChange = (questionId: number, choiceId: number) => {
    setSelectedAnswer(choiceId);
    setAnswer((prevAnswer) => {
      const updatedAnswerDtos = prevAnswer.answerDtos.map((answerDto: any) =>
        answerDto.id === questionId
          ? {
              ...answerDto,
              choiceIds: [choiceId],
            }
          : answerDto
      );
      return { ...prevAnswer, answerDtos: updatedAnswerDtos };
    });
  };

  return (
    <>
      {/* 이미 선택한 것만 보여주는 경우 */}
      {isReadOnly && (
        <div className={styles.SpacingWrapper}>
          <p className={styles.Question}>
            Q{index + 1}. {questions.text}
          </p>
          {choices &&
            choices.map((choice) => (
              <SingleCheckBox
                key={choice.id}
                className={styles.CheckBox}
                checkBoxType={
                  choice.selected ? 'Active' : 'Default'
                }
                onClick={() => handleChoiceChange(questions.id, choice.id)}
              >
                {choice.text}
              </SingleCheckBox>
            ))}
        </div>
      )}

      {/* 선택할 수 있는 경우 */}
      {!isReadOnly && (
        <div className={styles.SpacingWrapper}>
          <p className={styles.Question}>
            Q{index + 1}. {questions.text}
          </p>
          {choices &&
            choices.map((choice) => (
              <SingleCheckBox
                key={choice.id}
                className={styles.CheckBox}
                checkBoxType={
                  selectedAnswer === choice.id ? 'Active' : 'Default'
                }
                onClick={() => handleChoiceChange(questions.id, choice.id)}
              >
                {choice.text}
              </SingleCheckBox>
            ))}
        </div>
      )}
    </>
  );
};

export default MultipleChoicePage;
