import styles from './MultipleChoice.module.scss';
import { useState, ChangeEvent } from 'react';
import { useRouter } from '@/hooks/useRouter';
import SingleCheckBox from '@/components/common/SingleCheckBox';

interface IMultipleChoice {
  questions: {
    id: number;
    text: string;
  }
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
  index:number;
}

const MultipleChoicePage: React.FC<IMultipleChoice> = ({
  questions,
  choices,
  index,
}) => {
  const router = useRouter();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCheckBoxClick = (choiceId: number) => {
    setSelectedAnswer(choiceId);
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
            onClick={() => handleCheckBoxClick(choice.id)}
          >
            {choice.text}
          </SingleCheckBox>
        ))}
    </div>
  );
};

export default MultipleChoicePage;
