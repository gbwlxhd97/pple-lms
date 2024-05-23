import React from 'react';
import styles from './Table2.module.scss';

interface Table2Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const Table2 = ({ tableBody, tableHead }: Table2Props) => {
  return (
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
            <td>{row.key}</td>
            <td>{row.value1}</td>
            <td>{row.value2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table2;
