import styles from './NoticeDetail.module.scss';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import noticeAPIList from '@/services/notice';
import { INoticeDetail } from '@/interfaces/notice';
import useProfileStore from '@/stores/useProfileStore';
import { useRouter } from '@/hooks/useRouter';
import toast from 'react-hot-toast';

const NoticeDetailPage = () => {
  const { courseId, noticeId } = useParams();
  console.log(courseId, noticeId);
  const {profile: {role}} = useProfileStore()
  const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();
  const router = useRouter()

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

  const deleteNotice = async () => {
    try {
      if(confirm('삭제 하시겠습니까?')) {
        const res = await noticeAPIList.deleteNotice(Number(noticeId));
        if(res) {
          toast.success("삭제가 완료되었습니다.")
          router.back(1);
        }
      }
    } catch (error) {
      toast.error('삭제를 실패했습니다.');
    }
  }

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
          {role === 'TEACHER' && (
            <Button
              buttonType="Active"
              className={styles.ListButton}
              onClick={deleteNotice}
            >
              삭제
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default NoticeDetailPage;
