import styles from './Table5.module.scss';
import Button from '@/components/common/Button/Button';
import courseAPIList from '@/services/course';
import { IClassRegist } from '@/interfaces/course';

interface Table5Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const Table5 = ({ tableBody, tableHead }: Table5Props) => {
  return (
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
          <tr key={rowIndex}>
            <td className={styles.Name}>{row.name}</td>
            <td className={styles.Tel}>{row.tel}</td>
            <td className={styles.Status}>
              <Button buttonType="Accept" className={styles.Button}>
                {' '}
                수락{' '}
              </Button>
              <Button buttonType="Refuse" className={styles.Button}>
                {' '}
                거절{' '}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table5;
