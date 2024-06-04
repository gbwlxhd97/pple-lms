import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import { useRouter } from '@/hooks/useRouter';
import courseAPIList from '@/services/course';
import useCourseNameStore from '@/stores/useCourseName';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "./index.module.scss"
import Title from '@/components/common/Title/Title';
import noticeAPIList from '@/services/notice';
const CourseDetailPage = () => {
  const {state} = useLocation()
  const router = useRouter();
  const { setTitle } = useCourseNameStore();
  const [courseData,setCourseData] = useState<any>()
  const onPushAttendPage = () => {
    router.push('/attendance', {} ,{state})
  }
  
  // 해당 과목 공지사항 및 과목명 반환
  const getCourseDatas = async () => {
    try {
      const res = await courseAPIList.getCoursePage(state.id);
      console.log(res);
      setTitle(res.courseName);
      setCourseData(res);
    } catch (error) {
      
    }
  }

  // 해당 과목 차시 데이터 생성
  const getCourseSection = async () => {
    const res = await courseAPIList.getCourseSection(state.id)
    
  }
  

  useEffect(() => {
    getCourseDatas();
    getCourseSection()
  },[])

  return (
    <div>
      <Card
        title="강좌 공지사항"
        emptyMsg="등록된 공지사항이 없습니다"
        options={courseData?.getNoticeListDTOList}
        titleiIsMore={true}
      />
      <div className={styles.CommonWrapper}>
        <Title title="출석정보" />
        <Button
          buttonType="Active"
          onClick={onPushAttendPage}
          className={styles.AttendButton}
        >
          출석정보확인
        </Button>
      </div>
      <div className={styles.CommonWrapper}>
        <Title title="강의자료" />
        <Button
          buttonType="Active"
          className={styles.AttendButton}
          onClick={() => {
            router.push(`/course/reference/${state.id}`);
          }}
        >
          강의자료확인
        </Button>
      </div>
    </div>
  );
}

export default CourseDetailPage;