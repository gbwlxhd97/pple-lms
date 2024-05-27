import Input from '@/components/common/Input/Input';
import styles from './StudentAttendanceWrap.module.scss';
import { useState } from 'react';
import { handleKeyDown } from '@/utils';
import Button from '@/components/common/Button/Button';
const StudentAttendanceWrap = () => {
  const [attendCode, setAttendCode] = useState('');

  const handleSubmit = async () => {};
  return (
    <div className={styles.AttendanceInputWrap}>
      <Input
        type="number"
        placeholder="출석코드를 입력하세요"
        onChange={(e) => {
          setAttendCode(e.target.value);
        }}
        onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
      />
      <Button
        buttonType={attendCode?.length > 0 ? 'Active' : 'Disabled'}
        className={styles.AttendanceButton}
      >
        출석하기
      </Button>
    </div>
  );
}

export default StudentAttendanceWrap;