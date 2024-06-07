import styles from './Notice.module.scss';
import Title from '@/components/common/Title/Title';
import Table2 from '@/components/common/Table2/Table2';
import useProfileStore from '@/stores/useProfileStore';
import { useEffect, useState } from 'react';
import noticeAPIList from '@/services/notice';
import { INoticeList } from '@/interfaces/notice';
import { useParams } from 'react-router';
import { today } from '@/utils/date';

const NoticePage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const { courseId } = useParams();

  const [noticeList, setNoticeList] = useState<Array<INoticeList>>();

  const getNoticeList = async () => {
    try {
      const res = await noticeAPIList.getNoticeList();
      const updatedData = res.map((item: INoticeList) => ({
        ...item,
        isNew: item.createdAt === today,
      }));
      console.log(updatedData);
      setNoticeList(updatedData);
    } catch (error) {}
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <>
      <Title
        title="공지사항"
        isShowButton={role === 'TEACHER'}
        path="/notice/edit"
      />
      <div className={styles.NoticeTable}>
        <Table2
          tableHead={['번호', '제목', '날짜']}
          tableBody={noticeList || []}
          path={`/course/${courseId}/notice/detail`}
        />
      </div>
    </>
  );
};

export default NoticePage;
