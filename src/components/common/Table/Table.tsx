import React from 'react';
import styles from './Table.module.scss';

interface TableProps {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const Table = ({ tableBody, tableHead }: TableProps) => {
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
          {tableBody.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td>{row.attendType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
