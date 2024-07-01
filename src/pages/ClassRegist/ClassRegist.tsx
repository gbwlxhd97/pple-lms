import styles from './ClassRegist.module.scss';
import Title from '@/components/common/Title/Title';
import Table5 from '@/components/common/Table5/Table5';
import useProfileStore from '@/stores/useProfileStore';
import { useEffect, useState } from 'react';
import courseAPIList from '@/services/course';
import { useParams } from 'react-router';
import { IClassRegist } from '@/interfaces/course';

const ClassRegistPage = () => {
  const {
    profile: { role },
  } = useProfileStore();

  const { courseId } = useParams();

  const [awaitingList, setAwaitingList] = useState<Array<IClassRegist>>();

  const getAwaitingList = async (courseId: number) => {
    try {
      const res = await courseAPIList.getCourseStudentsAwaiting(courseId);
      const updatedData = res.data.map((item: IClassRegist) => ({
        ...item,
      }));
      console.log(updatedData);
      setAwaitingList(updatedData);
    } catch (error) {}
  };

  useEffect(() => {
    if (courseId) {
      getAwaitingList(parseInt(courseId));
    }
  }, [courseId]);

  return (
    <>
      <Title title="학생수강신청" />
      <div className={styles.ClassRegistTable}>
        <Table5
          tableHead={['이름', '전화번호', '수강신청']}
          tableBody={awaitingList || []}
        />
      </div>
    </>
  );
};

export default ClassRegistPage;
