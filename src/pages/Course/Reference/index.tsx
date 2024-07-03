import useProfileStore from '@/stores/useProfileStore';
import styles from './index.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';
import { useParams } from 'react-router-dom';
import courseAPIList from '@/services/course';
import { useEffect, useState } from 'react';
import { IReferenceList } from '@/interfaces/course';
import { today } from '@/utils/date';

const CourseReferencePage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const { courseId } = useParams();
  const [referenceList, setReferenceList] = useState<
    IReferenceList[] | undefined
  >();
  const getReferList = async () => {
    try {
      const res = await courseAPIList.getCourseReferenceList(Number(courseId));
      // isNew 필드 추가
      const updatedData = res.map((item: IReferenceList) => ({
        ...item,
        isNew: item.createdAt === today(),
      }));
      console.log(updatedData);

      setReferenceList(updatedData);
    } catch (error) {}
  };

  useEffect(() => {
    getReferList();
  }, []);

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
          path="/course/reference/detail"
        />
      </div>
    </>
  );
};

export default CourseReferencePage;
