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
            <th key={index} className={styles[`TableHead${index}`]}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.TableBody}>
        {tableBody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className={styles.TableNum}>{rowIndex + 1}</td>
            <td className={styles.TableTitle}>
              {row.value1}이것은 공지사항입니다.
            </td>
            <td className={styles.TableDate}>{row.value2}2024.03.02</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table2;
