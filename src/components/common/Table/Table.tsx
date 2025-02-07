import React from 'react';
import styles from './Table.module.scss';
import useProfileStore from '@/stores/useProfileStore';

interface TableProps {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const Table = ({ tableBody, tableHead }: TableProps) => {
  const {profile :{role}} = useProfileStore()
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
            <tr key={index}>
              <td>{role === 'TEACHER' ? row.name : row.session}</td>
              <td
                className={`${styles.AttendType} ${row.attendType === 'PRESENT' ? styles.Present : row.attendType === 'ABSENT' ? styles.Absent : row.attendType === 'LATE' ? styles.Late : ''} `}
              >
                {row.attendType}
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

export default Table;
