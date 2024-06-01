import styles from './NoticeDetail.module.scss';
import Button from '@/components/common/Button/Button';
import { useParams } from 'react-router-dom';

const NoticeDetailPage = () => {
  const { id } = useParams();

  const notice = {
    id: 1,
    title: '이것은 공지사항입니다.',
    content:
      '이것은 공지사항 예시입니다. 아무말이나 길게 써야하기 때문에 아무말이나 짓껄이겠습니다. 오늘 날씨는 너무 좋고 밖으로 나가 농구를 하면 좋을듯 합니다. 이상.',
    writer: '김철수',
    createdAt: '2024.04.18',
  };

  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.NoticeDetail}>
          <h2>{notice.title}</h2>
          <div className={styles.WriterAndDate}>
            <span>{notice.writer}</span>
            <span> • </span>
            <span>작성일 {notice.createdAt}</span>
          </div>
          <p className={styles.content}>{notice.content}</p>
        </div>
        <Button buttonType="White" className={styles.ListButton}>
          목록
        </Button>
      </div>
    </>
  );
};

export default NoticeDetailPage;
