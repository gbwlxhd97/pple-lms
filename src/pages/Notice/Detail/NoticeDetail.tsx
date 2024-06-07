import styles from './NoticeDetail.module.scss';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import noticeAPIList from '@/services/notice';
import { INoticeDetail } from '@/interfaces/notice';

const NoticeDetailPage = () => {
  const { courseId, noticeId } = useParams();
  console.log(courseId, noticeId);

  const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();

  const getDetailNotice = async () => {
    try {
      if (noticeId) {
        // noticeId가 존재하는 경우에만 함수 호출
        const res = await noticeAPIList.getDetailNotice(parseInt(noticeId));
        console.log(res.data);
        setNoticeDetail(res.data);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDetailNotice();
  }, []);

  return (
    <>
      <div className={styles.DetailContainer}>
        <div className={styles.NoticeDetail}>
          <h2>{noticeDetail?.title}</h2>
          <div className={styles.WriterAndDate}>
            <span>{noticeDetail?.writerName}</span>
            <span> • </span>
            <span>작성일 {noticeDetail?.createdAt}</span>
          </div>
          <p className={styles.content}>{noticeDetail?.main}</p>
        </div>
        <div className={styles.Buttoncontainer}>
          <Link to={`/course/${courseId}/notice`}>
            <Button buttonType="List" className={styles.ListButton}>
              목록
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoticeDetailPage;
