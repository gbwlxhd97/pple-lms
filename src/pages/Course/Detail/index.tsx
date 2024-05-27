import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import courseAPIList from '@/services/course';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CourseDetailPage = () => {
  const {state} = useLocation()
  console.log(state);
  const getCourseDatas = async () => {
    const res = await courseAPIList.getCoursePage(state.id);
    console.log(res);
  }

  const getCourseSection = async () => {
    const res = await courseAPIList.getCourseSection(state.id)
    if(res) {
      console.log('차시 정보 생성');
    }
  }



  useEffect(() => {
    getCourseDatas();
    getCourseSection()
  },[])

  return (
    <div>
      <Card title="강좌 공지사항" options={[1, 2, 3]} />
      <Button buttonType="Active">
        <Link to={'/attendance'}>출석정보조회</Link>
      </Button>
    </div>
  );
}

export default CourseDetailPage;