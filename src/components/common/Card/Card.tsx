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
        {options?.map((item: any, i: number) => (
          <div className={styles.Flex} key={i}>
            <div className={styles.CardContent}>{item.title}</div>
            <div className={styles.CardDate}>
              {item.createdAt?.replaceAll('-', '.')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
