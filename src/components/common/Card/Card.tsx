import { useRouter } from '@/hooks/useRouter';
import Title from '../Title/Title';
import styles from './Card.module.scss';
import useProfileStore from '@/stores/useProfileStore';
import toast from 'react-hot-toast';
import { loadingToast } from '@/utils';
import { useParams } from 'react-router';

type CardProps = {
  title: string;
  options?: Array<any>;
  titleiIsMore?: boolean;
  count?: number;
  emptyMsg?: string;
};

const Card = ({ title, options, titleiIsMore, count, emptyMsg }: CardProps) => {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { courseId } = useParams();

  const onPushDetailPage = (state: any) => {
    if (title === '수강중인 강의') {
      router.push(`/course/${state.id}`, {}, state);
      return;
    }
    if (title === '강좌 공지사항') {
      // router.push(`/course/${courseId}/notice/detail/${state.id}`);
      loadingToast();
      return;
    } else {
      loadingToast();
    }
  };
  return (
    <div className={styles.CardContainer}>
      <Title title={title} isMore={titleiIsMore} count={count} />
      <div className={styles.CardWrap}>
        {options?.length == 0 && emptyMsg && (
          <div className={styles.EmptyMsgWrap}>{emptyMsg}</div>
        )}
        {options?.map((item: any, i: number) => (
          <div
            className={styles.Flex}
            key={i}
            onClick={() => {
              onPushDetailPage(item);
            }}
          >
            <div className={styles.CardContent}>{item.title}</div>
            <div className={styles.CardDate}>
              {item.createdAt?.replaceAll('-', '.')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
