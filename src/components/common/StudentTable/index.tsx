import React from 'react';
import styles from './index.module.scss';
import { useRouter } from '@/hooks/useRouter';
import { useParams } from 'react-router';

type StudentTableProps = {
  tableHead: Array<string>;
  tableBody: Array<any>;
  path?: string;
};

const StudentTable = ({ tableHead, tableBody, path }: StudentTableProps) => {
  const router = useRouter();
  const { courseId } = useParams();
  const goPushPath = (studentId: string) => {
    router.push(`/course/${courseId}/statistics/detail/${studentId}`);
  };
  return (
    <div className={styles.TableContainer}>
      <table style={{ width: '100%' }}>
        <thead className={styles.TableHead}>
          <tr>
            {tableHead.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          {tableBody.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                goPushPath(row.id);
              }}
            >
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.tel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
