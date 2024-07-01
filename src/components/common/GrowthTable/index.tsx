import { useRouter } from '@/hooks/useRouter';
import styles from './index.module.scss';

interface Table5Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const GrowthTable = ({ tableBody, tableHead }: Table5Props) => {
  const router = useRouter();

  const onPushPage = (courseId:number,memberId: number) => {
    router.push(`/course/${courseId}/statistics/detail/${memberId}`);
  }

  return (
    <div className={styles.Container}>
      <table style={{ width: '100%' }}>
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
            <tr key={rowIndex} onClick={() => {
              onPushPage(1,row.memberId);
            }}>
              <td className={styles.Name}>{row.name}</td>
              <td className={styles.Tel}>{row.main}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrowthTable;
