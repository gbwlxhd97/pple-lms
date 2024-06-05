import styles from './AssignmentDetail.module.scss';
import { Link, useParams } from 'react-router-dom';
import AssignmentSubmitPage from '@/pages/Assignment/Submit/AssignmentSubmit';

const AssignmentDetailPage = () => {
  const { id } = useParams();

  const assignment = {
    id: 1,
    title: '과제제목입니다',
    subject: '수학',
    writer: '김철수',
    createdAt: '2024.05.13 오후 12:50',
    dueDate: '2024.05.13 오후 12:50',
    content:
      '이것은 공지사항 예시입니다. 아무말이나 길게 써야하기 때문에 아무말이나 짓껄이겠습니다. 오늘 날씨는 너무 좋고 밖으로 나가 농구를 하면 좋을듯 합니다. 이상.',
  };

  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.AssignmentDetail}>
          <h2>{assignment.title}</h2>
          <div className={styles.SubjectAndWriter}>
            <span>{assignment.subject}</span>
            <span> • </span>
            <span>{assignment.writer}</span>
          </div>
          <div className={styles.Date}>
            <div className={styles.InfoRow}>
              <span className={styles.InfoLabel}>게시일</span>
              <span className={styles.Info}>{assignment.createdAt}</span>
            </div>
            <div className={styles.InfoRow}>
              <span className={styles.InfoLabel}>마감일</span>
              <span className={styles.Info}>{assignment.dueDate}</span>
            </div>
          </div>
          <p className={styles.content}>{assignment.content}</p>
        </div>
      </div>
      <div className={styles.Space}></div>
      <div className={styles.AssignmentSubmit}>
        <AssignmentSubmitPage />
      </div>
    </>
  );
};

export default AssignmentDetailPage;
