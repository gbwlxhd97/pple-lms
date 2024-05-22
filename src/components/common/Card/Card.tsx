import Title from '../Title/Title';
import styles from './Card.module.scss';

type CardProps = {
  title: string;
  options: Array<any>;
  titleiIsMore?: boolean;
  count?: number;
};

const Card = ({ title, options, titleiIsMore, count }: CardProps) => {
  return (
    <div className={styles.CardContainer}>
      <Title title={title} isMore={titleiIsMore} count={count} />
      <div className={styles.CardWrap}>
        {options?.map((item, i) => (
          <div className={styles.Flex}>
            <div className={styles.CardContent}>수학</div>
            <div className={styles.CardDate}>2024.01.03</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
