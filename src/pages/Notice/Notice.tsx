import styles from './Notice.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';
import useProfileStore from '@/stores/useProfileStore';
import { useEffect, useState } from 'react';
import noticeAPIList from '@/services/notice';
import { INoticeList } from '@/interfaces/notice';

const NoticePage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const [noticeList, setNoticeList] = useState<Array<INoticeList>>();

  const getNoticeList = async () => {
    try {
      const res = await noticeAPIList.getNoticeList();
      console.log(res);
      setNoticeList(res);
    } catch (error) {}
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <>
      <Title title="공지사항" isShowButton={role === 'TEACHER'} path='/notice/edit' />
      <div className={styles.NoticeTable}>
        <Table2
          tableHead={['번호', '제목', '날짜']}
          tableBody={noticeList || []}
          isShowNew={true}
          path="/notice/detail"
        />
      </div>
    </>
  );
};

export default NoticePage;
