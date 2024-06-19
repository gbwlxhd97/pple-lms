import styles from './ShortAnswer.module.scss';
import { useState, ChangeEvent } from 'react';
import { useRouter } from '@/hooks/useRouter';
import Input2 from '@/components/common/Input2/Input2';
import useProfileStore from '@/stores/useProfileStore';

interface IinsertBody {
  question: string;
  choices?: {
    id: number;
    num: number;
    text: string;
  }[];
}

const ShortAnswerPage: React.FC<IinsertBody> = ({ question, choices }) => {
  const router = useRouter();

  const [answer, setAnswer] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className={styles.SpacingWrapper}>
      <p className={styles.Question}>{question}</p>
      <Input2
        name="shortanswer"
        type="text"
        placeholder="답변 입력"
        onChange={handleChange}
      />
    </div>
  );
};

export default ShortAnswerPage;
