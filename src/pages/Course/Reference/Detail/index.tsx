import courseAPIList from '@/services/course';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { IReferenceDetail } from '@/interfaces/course';
import Button from '@/components/common/Button/Button';
import { useRouter } from '@/hooks/useRouter';
import { FileIcon } from '@/icons/icon';
import { downloadFile } from '@/utils';
import toast from 'react-hot-toast';
import useProfileStore from '@/stores/useProfileStore';

const CourseReferenceDetailPage = () => {
  const { courseId } = useParams();
  const [detailInfo, setDetailInfo] = useState<IReferenceDetail>();
  const getReferDetail = async () => {
    const res = await courseAPIList.getCourseReferenceDetail(Number(courseId));
    console.log(res);
    setDetailInfo(res);
  };
  const {
    profile: { role },
  } = useProfileStore();
  useEffect(() => {
    getReferDetail();
  }, []);

  const router = useRouter();

  const deleteNote = async () => {
    if (confirm('삭제 하시겠습니까? (추후 예쁘게 변경예정..)')) {
      try {
        const res = await courseAPIList.deleteCourseReference(Number(courseId));
        console.log(res);
        if (res) {
          toast.success('삭제 완료');
          router.back(1);
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <div className={styles.Title}>{detailInfo?.title}</div>
      <div className={styles.InfoWrap}>
        <div>{detailInfo?.writerName}</div>
        <span>・</span>
        <div>{detailInfo?.createdAt}</div>
      </div>
      <div className="SpacingDividerWrapper">
        <div className="Divider"></div>
      </div>
      <div className={styles.content}>{detailInfo?.main}</div>
      <div className={styles.FileContainer}>
        {detailInfo?.noteFileDtos?.map((item, idx) => (
          <div className={styles.FileColumnWrapper} key={idx}>
            <div className={styles.FileWrap}>
              <div className={styles.Flex}>
                <div>
                  <FileIcon width={24} height={24} />
                </div>
                <div className={styles.Name}>{item.fileName}</div>
              </div>
              <div>
                <Button
                  className={styles.DownloadButton}
                  buttonType="TimeActive"
                  onClick={() => {
                    downloadFile(item.filePath, item.fileName);
                  }}
                >
                  다운로드
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ListButtonWrap}>
        <Button
          className={styles.ListButton}
          buttonType="List"
          onClick={() => {
            router.back(1);
          }}
        >
          목록
        </Button>
        {role === 'TEACHER' && (
          <Button
            buttonType="Active"
            className={styles.ListButton}
            onClick={deleteNote}
          >
            삭제
          </Button>
        )}
      </div>
    </>
  );
};

export default CourseReferenceDetailPage;
