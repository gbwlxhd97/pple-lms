import Card from '@/components/common/Card/Card';
import styles from './Main.module.scss';

const MainPage = () => {
  return (
    <>
      <div>학생님, 환영합니다.</div>
      <Card title="LMS 공지사항" options={[0, 2, 3]} titleiIsMore={true} />
      <Card title="수강중인 강의" options={[0, 2, 3]} titleiIsMore={true} />
      <Card
        title="나의 과제"
        options={[0, 2, 3]}
        titleiIsMore={true}
        count={5}
      />
    </>
  );
};

export default MainPage;
