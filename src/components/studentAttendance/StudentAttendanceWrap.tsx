import Input from '@/components/common/Input/Input';
import styles from './StudentAttendanceWrap.module.scss';
import { useEffect, useState } from 'react';
import { handleKeyDown } from '@/utils';
import Button from '@/components/common/Button/Button';
import attendAPIList from '@/services/attend';

type StudentAttendanceProps = {
  studentWeekSection: Array<any>;
  setStudentWeekSection: React.Dispatch<any>;
};

const StudentAttendanceWrap = ({
  studentWeekSection,
  setStudentWeekSection,
}: StudentAttendanceProps) => {
  const [attendCode, setAttendCode] = useState('');
  const [isCompleteAttend, setIsCompleteAttend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getAttendInfo = async () => {
    try {
      const res = await attendAPIList.getShowAttendPage();
      console.log(res);
      setStudentWeekSection(res.data.attendStatusDto);
    } catch (error) {
    }
  };

  const handleSubmitAttendCode = async () => {
    try {
      setIsLoading(true);
      const payload = {
        attendCode: Number(attendCode),
        courseSectionId: 7,
      };
      const res = await attendAPIList.insetAttendCode(payload);
      if (res.status === 200) {
        setIsCompleteAttend(true);
        getAttendInfo();
      }
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAttendInfo();
  }, []);

  return (
    <div className={styles.AttendanceInputWrap}>
      {!isCompleteAttend && (
        <Input
          type="tel"
          placeholder="출석코드를 입력하세요"
          onChange={(e) => {
            setAttendCode(e.target.value);
          }}
          onKeyDown={(e) => handleKeyDown(e, handleSubmitAttendCode)}
        />
      )}
      {isCompleteAttend && (
        <div className={styles.CompleteAttend}>출석이 완료되었습니다!</div>
      )}
      <Button
        buttonType={
          isCompleteAttend
            ? 'Disabled'
            : attendCode?.length > 0
              ? 'Active'
              : 'Disabled'
        }
        className={styles.AttendanceButton}
        onClick={handleSubmitAttendCode}
        isLoading={isLoading}
      >
        출석하기
      </Button>
    </div>
  );
};

export default StudentAttendanceWrap;