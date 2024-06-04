import Title from '@/components/common/Title/Title'
import useProfileStore from '@/stores/useProfileStore';

const CourseReferenceEditPage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  return (
    <div className="SpacingWrapper">
      <Title title='강의 자료 업로드'/>
    </div>
  )
}

export default CourseReferenceEditPage