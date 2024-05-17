import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Title from '@/components/common/Title/Title';
import styles from './Attendance.module.scss';
import Table from '@/components/common/Table/Table';
const AttendancePage = () => {
  return (
    <>
      <Title title="출석체크" />
      <div className={styles.AttendanceInputWrap}>
        <Input type="number" />
        <Button buttonType="Disabled" className={styles.AttendanceButton}>
          출석하기
        </Button>
      </div>
      <Title title="출석현황" />
      <div className={styles.AttendanceTable}>
        <Table
          tableBody={[
            { key: 1, value: 1222 },
            { key: 2, value: 13333 },
          ]}
          tableHead={['차시', '출석여부']}
        />
      </div>
    </>
  );
};

export default AttendancePage;
