import Card from '@/components/common/Card/Card';
import styles from './Main.module.scss';
import AssignmentCard from '@/components/common/AssignmentCard/AssignmentCard';
import Title from '@/components/common/Title/Title';
import memberAPIList from '@/services/member';
import { useEffect } from 'react';

const MainPage = () => {
  /**
   * 가장 기본이 되는 get요청이며
   * 추후 react-query로 변경할 것입니다.
   */
  const getInfo = async () => {
    const res = await memberAPIList.memberShowMainPage();
    console.log(res);
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <div>학생님, 환영합니다.</div>
      <Card title="LMS 공지사항" options={[0, 2, 3]} titleiIsMore={true} />
      <Card title="수강중인 강의" options={[0, 2, 3]} titleiIsMore={true} />
      <Title title={'나의 과제'} isMore={true} count={5} />
      <div className={styles.MainAssignmentWrapper}>
        {[0, 1, 2, 34].map((item, i) => (
          <AssignmentCard
            dDay="1"
            description="수학 레포트 어쩌구 저쩌구 어쩌구 저쩌구 어쩌..."
            title="나의 과제"
          />
        ))}
      </div>
    </>
  );
};

export default MainPage;
