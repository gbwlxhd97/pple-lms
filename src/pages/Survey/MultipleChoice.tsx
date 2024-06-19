import styles from './MultipleChoice.module.scss';
import { useState, ChangeEvent } from 'react';
import { useRouter } from '@/hooks/useRouter';
import SingleCheckBox from '@/components/common/SingleCheckBox';

interface IMultipleChoice {
  question: string;
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
}

const MultipleChoicePage: React.FC<IMultipleChoice> = ({
  question,
  choices,
}) => {
  const router = useRouter();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCheckBoxClick = (choiceId: number) => {
    setSelectedAnswer(choiceId);
  };

  return (
    <div className={styles.SpacingWrapper}>
      <p className={styles.Question}>{question}</p>
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
