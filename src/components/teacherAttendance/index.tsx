import { useState } from 'react';
import AllianceDropdown from '../attendanceSelect';
import Button from '../common/Button/Button';
import styles from './index.module.scss';

const TeacherAttendance = () => {
  const [studySession, setStudySession] = useState("")
  const districtList = [
    '서울특별시 전체',
    '경기도 전체',
    '수도권 전체',
    '부산광역시',
    '인천광역시',
    '대구광역시',
    '대전광역시',
    '광주광역시',
    '강원도',
    '충청도',
    '전라도',
    '경상도',
    '제주도',
  ];
  return (
    <>
      <AllianceDropdown
        region={studySession}
        setRegion={setStudySession}
        options={districtList}
      />
      <div className={styles.TeacherAttendanceButtonWrap}>
        <Button buttonType="Active">수업 시작하기</Button>
        <Button buttonType="Abled">수업 끝내기</Button>
      </div>
    </>
  );
}

export default TeacherAttendance;