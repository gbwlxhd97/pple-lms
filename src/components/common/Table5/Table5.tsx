import styles from './Table5.module.scss';
import Button from '@/components/common/Button/Button';
import courseAPIList from '@/services/course';
import { IClassRegist } from '@/interfaces/course';
import { useParams } from 'react-router';

interface Table5Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
  fetchData:any;
}

const Table5 = ({ tableBody, tableHead, fetchData }: Table5Props) => {
  const { courseId } = useParams();
  const handleSubmit = async (memberId: number, isApprove: boolean) => {
    try {
      if (
        confirm(
          `${isApprove ? '수강신청을 허락하시겠습니까?' : '수강신청을 거절하시겠습니까?'}`
        )
      ) {
        const res = await courseAPIList.StudentEnroll(
          Number(courseId),
          memberId,
          isApprove
        );
        console.log(res);
        if(res) {
          fetchData(Number(courseId));
        }
      }
    } catch (error) {}
  };
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
              <Button
                buttonType="Accept"
                className={styles.Button}
                onClick={() => {
                  handleSubmit(row?.id, true);
                }}
              >
                {' '}
                수락{' '}
              </Button>
              <Button
                buttonType="Refuse"
                className={styles.Button}
                onClick={() => {
                  handleSubmit(row?.id, false);
                }}
              >
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
