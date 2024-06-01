import React from 'react';
import styles from './Table2.module.scss';
import NewIcon from '@/icons/icon/NewIcon';
import { Link } from 'react-router-dom';

interface Table2Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: { id: number; title: string; createdAt: string }[]; // 각 행의 데이터 배열
  isShowNew?: boolean;
}

const Table2 = ({ tableBody, tableHead, isShowNew }: Table2Props) => {
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
              <Link to={`/notice/detail/${row.id}`}>{row.title}</Link>
              {isShowNew && (
                <div className={styles.NewIcon}>
                  <NewIcon width={12} height={12} />
                </div>
              )}
            </td>
            <td className={styles.TableDate}>{row.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table2;
