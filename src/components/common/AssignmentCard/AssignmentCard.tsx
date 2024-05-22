import Title from '../Title/Title';
import styles from './AssignmentCard.module.scss';

type AssignmentProps = {
  title: string;
  description: string;
  dDay: string;
};

const AssignmentCard = ({ title, description, dDay }: AssignmentProps) => {
  return (
    <>
      <div className={styles.AssignmentCardContainer}>
        <div className={styles.AssignmentDescription}>{description}</div>
        <div className={styles.AssignmentTitleFlex}>
          <div className={styles.AssignmentDday}>{title}</div>
          <div className={styles.AssignmentTitle}>D-{dDay}</div>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard;
