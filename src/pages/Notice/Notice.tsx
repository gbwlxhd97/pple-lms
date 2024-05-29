import styles from './Notice.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';
import useProfileStore from '@/stores/useProfileStore';

const NoticePage = () => {
  const {
    profile: { role },
  } = useProfileStore();

  return (
    <>
      <Title title="공지사항" isShowButton={role === 'TEACHER'} />
      <div className={styles.NoticeTable}>
        <Table2
          tableHead={['번호', '제목', '날짜']}
          tableBody={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          isShowNew={true}
        />
      </div>
    </>
  );
};

export default NoticePage;
