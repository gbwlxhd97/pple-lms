import React from 'react';
import styles from './index.module.scss';
import useProfileStore from '@/stores/useProfileStore';

interface TableProps {
  //   tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const DITable = ({ tableBody }: TableProps) => {
  const {
    profile: { role },
  } = useProfileStore();
  return (
    <div className={styles.TableContainer}>
      <table style={{ width: '100%' }}>
        <thead className={styles.TableHead}>
          <tr>
            <>
              <th className={styles.IndexWithTitle}>
                <th>번호</th>
                <th>제목</th>
              </th>
              <th className={styles.CreatedAt}>날짜</th>
            </>
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          {tableBody.map((row, index) => (
            <tr key={index}>
              <th className={styles.IndexWithTitle}>
                <td>{index + 1}</td>
                <td>{row.title}</td>
              </th>
              <th>
                <td className={styles.CreatedAt}>{row.createdAt}</td>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DITable;
