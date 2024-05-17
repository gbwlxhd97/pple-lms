import Title from '../Title/Title';
import styles from './Card.module.scss';

type CardProps = {
  title: string;
  options: Array<any>;
};

const Card = ({ title, options }: CardProps) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.TitleFlex}>
        <Title title={title} />
        <div>더 보기</div>
      </div>
      <div className={styles.CardWrap}>
        {options?.map((item, i) => (
          <div className={styles.Flex}>
            <div>수학</div>
            <div>2024.01.03</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
