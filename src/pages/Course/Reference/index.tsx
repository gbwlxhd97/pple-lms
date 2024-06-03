import useProfileStore from '@/stores/useProfileStore';
import styles from './index.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';
import { useParams } from 'react-router-dom';
import courseAPIList from '@/services/course';
import { useEffect } from 'react';

const CourseReferencePage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const {id} = useParams()
  const noticeList = [
    { id: 1, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 2, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 3, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 4, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 5, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 6, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 7, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 8, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 9, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
    { id: 10, title: '이것은 공지사항입니다.', createdAt: '2024.04.18' },
  ];

  const getReferList = async () => {
    const res = await courseAPIList.getCourseReferenceList(Number(id));
    console.log(res);
    
  }

  useEffect(() => {
    getReferList()
  },[])

  return (
    <>
      <div className="SpacingWrapper">
        <Title title="강의 자료" isShowButton={role === 'TEACHER'} />
      </div>
      <div className={styles.NoticeTable}>
        <Table2
          tableHead={['번호', '제목', '날짜']}
          tableBody={noticeList}
          isShowNew={true}
          path='/course/reference/detail'
        />
      </div>
    </>
  );
}

export default CourseReferencePage