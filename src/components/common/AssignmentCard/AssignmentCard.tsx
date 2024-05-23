import Title from '../Title/Title';
import styles from './AssignmentCard.module.scss';

type AssignmentProps = {
  title: string;
  description: string;
  dDay: string;
  isDragging: boolean;
};

const AssignmentCard = ({
  title,
  description,
  dDay,
  isDragging,
}: AssignmentProps) => {
  return (
    <div>
      <div
        className={`${styles.AssignmentCardWrapper} ${isDragging ? styles.dragging : ''}`}
      >
        <div className={styles.AssignmentDescription}>{description}</div>
        <div className={styles.AssignmentTitleFlex}>
          <div className={styles.AssignmentDday}>{title}</div>
          <div className={styles.AssignmentTitle}>D-{dDay}</div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
