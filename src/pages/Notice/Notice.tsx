import styles from './Notice.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';

const NoticePage = () => {
  return (
    <>
      <Title title="공지사항" isShowButton={true} />
      <div className={styles.NoticeTable}>
        <Table2
          tableBody={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          tableHead={['번호', '제목', '날짜']}
        />
      </div>
    </>
  );
};

export default NoticePage;
