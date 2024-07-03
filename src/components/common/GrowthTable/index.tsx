import { useRouter } from '@/hooks/useRouter';
import styles from './index.module.scss';
import { useParams } from 'react-router';

interface Table5Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const GrowthTable = ({ tableBody, tableHead }: Table5Props) => {
  const router = useRouter();
  const {courseId} = useParams()
  console.log(courseId,"zhtm");
  
  const onPushPage = (memberId: number) => {
    router.push(`/course/${courseId}/statistics/detail/${memberId}`);
  }

  return (
    <div className={styles.Container}>
      <table className={styles.table}>
        <thead className={styles.TableHead}>
          <tr>
            {tableHead.map((column, index) => (
              <th key={index} className={styles[`TableHead${index}`]}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          {tableBody.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => {
                onPushPage(row.memberId);
              }}
            >
              <td className={styles.Name}>{row.name}</td>
              <td className={styles.Tel}>
                <div>{row.main}</div>
              </td>
            </tr>
          ))}
          {/* 데이터가 없을경우 */}
          {tableBody.length === 0 && (
            <tr className={'EmptyData'}>정보가 없습니다.</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GrowthTable;
