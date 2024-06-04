import useProfileStore from '@/stores/useProfileStore';
import styles from './index.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';
import { useParams } from 'react-router-dom';
import courseAPIList from '@/services/course';
import { useEffect, useState } from 'react';

const CourseReferencePage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const {id} = useParams()
  const [referenceList, setReferenceList] = useState()
  const getReferList = async () => {
    try {
      const res = await courseAPIList.getCourseReferenceList(Number(id));
      console.log(res);
      setReferenceList(res);
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    getReferList()
  },[])

  return (
    <>
      <div className="SpacingWrapper">
        <Title
          title="강의 자료"
          isShowButton={role === 'TEACHER'}
          path="/course/reference/edit"
        />
      </div>
      <div className={styles.NoticeTable}>
        <Table2
          tableHead={['번호', '제목', '날짜']}
          tableBody={referenceList || []}
          isShowNew={true}
          path="/course/reference/detail"
        />
      </div>
    </>
  );
}

export default CourseReferencePage