import React from 'react';
import styles from './Table3.module.scss';
import NewIcon from '@/icons/icon/NewIcon';
import { Link } from 'react-router-dom';

interface Table3Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: TableRow[]; // 각 행의 데이터 배열
  path?: string;
}

interface TableRow {
  id: number;
  title: string;
  createdAt?: string;
  isNew?: boolean;
  endAt?: string;
}

const Table3 = ({ tableBody, tableHead, path }: Table3Props) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
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
            <td className={styles.TableTitle}>
              <div
                className={`${styles.Title} ${row.isNew ? `${styles.isNew}` : ''}`}
              >
                <Link to={`${path}/${row.id}`}>{row.title}</Link>
                {row.isNew && (
                  <div className={styles.NewIcon}>
                    <NewIcon width={12} height={12} />
                  </div>
                )}
              </div>
            </td>
            {row.endAt && (
              <td className={styles.EndAt}>{formatDate(row.endAt)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table3;
