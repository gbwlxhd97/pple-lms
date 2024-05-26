import Card from '@/components/common/Card/Card';
import styles from './Main.module.scss';
import Title from '@/components/common/Title/Title';
import memberAPIList from '@/services/member';
import { useEffect, useState } from 'react';
import AssignmentList from '@/components/common/AssignmentCardList/AssignmentCardList';
import Cookies from 'js-cookie';
import { IMainPageResponse } from '@/interfaces/member';

const MainPage = () => {
  const [mainData, setMainData] = useState<IMainPageResponse>();

  /**
   * 가장 기본이 되는 get요청이며
   * 추후 react-query로 변경할 것입니다.
   */
  const getInfo = async () => {
    try {
      const session: any = Cookies.get('memberSessionKey');
      const res = await memberAPIList.memberShowMainPage(session);
      console.log(res);
      setMainData(res)
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <div className={styles.MainUserWelcome}>
        <span>{mainData?.userName}</span>님, 환영합니다.
      </div>
      {/* TODO 아래 언디파인 고치기 */}
      <Card title="LMS 공지사항" options={mainData?.lmsNoticeDtos || []} titleiIsMore={true} />
      <Card title="수강중인 강의" options={[0, 2, 3]} titleiIsMore={true} />
      <div className={styles.MainMyAssignmentWrap}>
        <Title title={'나의 과제'} isMore={true} count={5} />
        <AssignmentList
          dataList={[1, 2, 3, 3, 4, 5, 6]}
          dDay="1"
          description="수학 레포트 어쩌구 저쩌구 어쩌구 저쩌구 어쩌..."
          title="나의 과제"
        />
      </div>
    </>
  );
};

export default MainPage;
