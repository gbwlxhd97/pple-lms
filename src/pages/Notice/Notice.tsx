import styles from './Notice.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';

const NoticePage = () => {
  return (
    <>
      <Title title="공지사항" />
      <div className={styles.NoticeTable}>
        <Table2
          tableBody={[
            { key: 1, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 2, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 3, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 4, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 5, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 6, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 7, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 8, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 9, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 10, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 11, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
            { key: 12, value1: '이것은 공지사항입니다', value2: '2024.03.02' },
          ]}
          tableHead={['번호', '제목', '날짜']}
        />
      </div>
    </>
  );
};

export default NoticePage;
