import courseAPIList from '@/services/course';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { IReferenceDetail } from '@/interfaces/course';
import Button from '@/components/common/Button/Button';
import { useRouter } from '@/hooks/useRouter';


const CourseReferenceDetailPage = () => {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState<IReferenceDetail>();
  const getReferDetail = async () => {
    const res = await courseAPIList.getCourseReferenceDetail(Number(id))
    console.log(res);
    setDetailInfo(res);
  }

  useEffect(() => {
    getReferDetail()
  },[])

  const router = useRouter()

  return (
    <>
      <div className={styles.Title}>{detailInfo?.main}</div>
      <div className={styles.InfoWrap}>
        <div>{detailInfo?.writerName}</div>
        <span>・</span>
        <div>{detailInfo?.createdAt}</div>
      </div>
      <div className={styles.ListButtonWrap}>
        <Button 
          className={styles.ListButton} 
          buttonType="List"
          onClick={() => {
            router.back(1);
          }}
          >
          목록
        </Button>
      </div>
    </>
  );
}

export default CourseReferenceDetailPage;