import React from 'react';
import styles from './Table2.module.scss';
import NewIcon from '@/icons/icon/NewIcon';
import { Link } from 'react-router-dom';
import { useRouter } from '@/hooks/useRouter';

interface Table2Props {
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
    submit?: string;
    dueDate?: string;
  };
}

const Table2 = ({ tableBody, tableHead, path }: Table2Props) => {
  const router = useRouter();
  const onPushPage = (rowId: number) => {
    router.push(`${path}/${rowId}`)
  }
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
          <tr
            key={rowIndex}
            className={
              row.titleDetails?.status === '종료' ? styles.EndedRow : ''
            }
            onClick={() => {
              onPushPage(row.id);
            }}
          >
            <td className={styles.TableNum}>{tableBody.length - rowIndex}</td>
            <td className={styles.TableTitle}>
              <div
                className={`${styles.Title} ${row.isNew ? `${styles.isNew}` : ''}`}
              >
                {row.title}
                {row.isNew && (
                  <div className={styles.NewIcon}>
                    <NewIcon width={12} height={12} />
                  </div>
                )}
              </div>
              {row.titleDetails && (
                <div className={styles.TitleDetails}>
                  {row.titleDetails.status && (
                    <span
                      className={`${styles.Status} ${row.titleDetails?.status === '진행중' ? styles.InProgress : styles.Ended}`}
                    >
                      {row.titleDetails.status}
                    </span>
                  )}
                  <span>・</span>
                  {row.titleDetails.submit && (
                    <span
                      className={`${styles.Submit} ${row.titleDetails?.status === '종료' && row.titleDetails?.submit === '미제출' ? styles.NotSubmitted : styles.Submit}`}
                    >
                      {row.titleDetails.submit}
                    </span>
                  )}
                  <span>・</span>
                  {row.titleDetails.dueDate && (
                    <span className={styles.DueDate}>
                      마감일 {row.titleDetails.dueDate}
                    </span>
                  )}
                </div>
              )}
            </td>
            {row.createdAt && (
              <td className={styles.CreatedAt}>{row.createdAt}</td>
            )}
          </tr>
        ))}
        {/* 데이터가 없을경우 */}
        {tableBody.length === 0 && (
          <tr className={'EmptyData'}>정보가 없습니다.</tr>
        )}
      </tbody>
    </table>
  );
};

export default Table2;
