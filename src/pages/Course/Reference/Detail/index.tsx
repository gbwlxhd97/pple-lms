import courseAPIList from '@/services/course';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { IReferenceDetail } from '@/interfaces/course';
import Button from '@/components/common/Button/Button';
import { useRouter } from '@/hooks/useRouter';
import { FileIcon } from '@/icons/icon';
import { downloadFile } from '@/utils';


const CourseReferenceDetailPage = () => {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState<IReferenceDetail>();
  const getReferDetail = async () => {
    const res = await courseAPIList.getCourseReferenceDetail(Number(id))
    console.log(res);
    setDetailInfo(res);
  }

  useEffect(() => {
    getReferDetail()
  },[])

  const router = useRouter()

  return (
    <>
      <div className={styles.Title}>{detailInfo?.main}</div>
      <div className={styles.InfoWrap}>
        <div>{detailInfo?.writerName}</div>
        <span>・</span>
        <div>{detailInfo?.createdAt}</div>
      </div>
      <div className="SpacingDividerWrapper">
        <div className="Divider"></div>
      </div>
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
                    downloadFile(item.filePath,item.fileName);
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
      </div>
    </>
  );
}

export default CourseReferenceDetailPage;