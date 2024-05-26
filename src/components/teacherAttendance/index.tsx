import Button from '../common/Button/Button';
import styles from './index.module.scss';

const TeacherAttendance = () => {
  return (
    <div className={styles.TeacherAttendanceButtonWrap}>
      <Button buttonType='Active'>수업 시작하기</Button>
      <Button buttonType='Abled'>수업 끝내기</Button>
    </div>
  );
}

export default TeacherAttendance;