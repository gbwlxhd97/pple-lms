import styles from './Assignment.module.scss';
import Table2 from '@/components/common/Table2/Table2';

const AssignmentPage = () => {
  const assignmentList = [
    {
      id: 1,
      title: '과제 제목입니다.',
      titleDetails: {
        status: '진행중',
        submit: '미제출',
        dueDate: '2024.03.02',
      },
    },
    {
      id: 2,
      title: '수학 레포트',
      titleDetails: { status: '진행중', submit: '제출', dueDate: '2024.03.02' },
    },
    {
      id: 3,
      title: '과학 과제',
      titleDetails: { status: '종료', submit: '제출', dueDate: '2024.03.02' },
    },
    {
      id: 4,
      title: '국어 과제',
      titleDetails: { status: '종료', submit: '미제출', dueDate: '2024.03.02' },
    },
    {
      id: 5,
      title: '국어 과제',
      titleDetails: { status: '종료', submit: '제출', dueDate: '2024.03.02' },
    },
    {
      id: 6,
      title: '과학 과제',
      titleDetails: { status: '종료', submit: '제출', dueDate: '2024.03.02' },
    },
    {
      id: 7,
      title: '국어 과제',
      titleDetails: { status: '종료', submit: '미제출', dueDate: '2024.03.02' },
    },
    {
      id: 8,
      title: '국어 과제',
      titleDetails: { status: '종료', submit: '제출', dueDate: '2024.03.02' },
    },
  ];
  return (
    <>
      <div className={styles.AssignmentTable}>
        <Table2
          tableHead={['번호', '제목']}
          tableBody={assignmentList}
          isShowNew={true}
          path="/assignment/detail"
        />
      </div>
    </>
  );
};

export default AssignmentPage;
