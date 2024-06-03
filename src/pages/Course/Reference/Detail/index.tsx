import courseAPIList from '@/services/course';
import { useParams } from 'react-router-dom';

const CourseReferenceDetailPage = () => {
  const { id } = useParams();
  const getReferDetail = async () => {
    const res = await courseAPIList.getCourseReferenceDetail(Number(id))
    console.log(res);
  }

  return (
    <>
      <div>여기는 상세 강의자료</div>
    </>
  )
}

export default CourseReferenceDetailPage;