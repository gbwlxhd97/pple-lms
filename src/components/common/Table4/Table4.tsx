import React from 'react';
import styles from './Table4.module.scss';
import NewIcon from '@/icons/icon/NewIcon';
import { Link } from 'react-router-dom';

interface Table4Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: TableRow[]; // 각 행의 데이터 배열
  path?: string;
}

interface TableRow {
  id: number;
  title: string;
  createdAt?: string;
  isNew?: boolean;
  titleDetails?: {
    status?: string;
    endAt?: string;
  };
}

const Table4 = ({ tableBody, tableHead, path }: Table4Props) => {
  const currentDate = new Date();

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
        {tableBody.map((row, rowIndex) => {
          const isPastDue = row.titleDetails?.endAt
            ? new Date(row.titleDetails.endAt) < currentDate
            : false;
          const isToday = row.titleDetails?.endAt
            ? new Date(row.titleDetails.endAt).toDateString() ===
              currentDate.toDateString()
            : false;

          return (
            <tr
              key={rowIndex}
              className={`${row.titleDetails?.status === '응시완료' ? styles.EndedRow : ''} 
                            ${isPastDue && !isToday ? styles.EndedRow : ''}`}
            >
              <td className={styles.TableNum}>{tableBody.length - rowIndex}</td>
              <td className={styles.TableTitle}>
                <div
                  className={`${styles.Title} ${row.isNew ? `${styles.isNew}` : ''}`}
                >
                  <Link to={`${path}/${row.id}`}>{row.title}</Link>
                </div>
                {row.titleDetails && (
                  <div className={styles.TitleDetails}>
                    {row.titleDetails.status && (
                      <span
                        className={`${styles.Status} ${row.titleDetails?.status === '응시 전' ? styles.InProgress : styles.Ended}
                                    ${row.titleDetails?.status === '미응시' ? styles.NotSubmitted : ''}`}
                      >
                        {row.titleDetails.status}
                      </span>
                    )}
                    <span>・</span>
                    {row.titleDetails.endAt && (
                      <span className={styles.EndAt}>
                        마감일 {row.titleDetails.endAt}
                      </span>
                    )}
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table4;
