import toast from 'react-hot-toast';
import styles from './Title.module.scss';
import { ArrowRightIcon } from '@/icons/icon';
import { loadingToast } from '@/utils';

type TitleProps = {
  title: string;
  className?: string;
  isMore?: boolean;
  count?: number;
};

/**
 * 버티컬 border Line + 제목 컴포넌트
 * @param param0
 * @returns
 */
const Title = ({ title, isMore, count }: TitleProps) => {
  return (
    <div className={styles.TitleFlex}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="Divider Vertical"></div>
        <div style={{ marginLeft: '16px' }} className={styles.CardTitle}>
          {title}
        </div>
        {count && <div className={styles.CardCount}>({count})</div>}
      </div>
      {isMore && (
        <div className={styles.CardMoreText} onClick={loadingToast}>
          더 보기
          <ArrowRightIcon width={6} height={10} stroke="#7879F1" />
        </div>
      )}
    </div>
    //
  );
};

export default Title;
