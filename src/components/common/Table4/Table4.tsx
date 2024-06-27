import React from 'react';
import styles from './Table4.module.scss';
import NewIcon from '@/icons/icon/NewIcon';
import { Link } from 'react-router-dom';
import { today } from '@/utils/date';
import { useRouter } from '@/hooks/useRouter';

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
  anonymous: boolean;
  endAt?: string;
  titleDetails?: {
    status?: string;
  };
  userParticipated: boolean;
}

const Table4 = ({ tableBody, tableHead, path }: Table4Props) => {

  const router = useRouter()

  const onPushPage = (id:number) => {
    router.push(`${path}/${id}/take-survey`)
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
        {tableBody.map((row, rowIndex) => {
          // 마감기한이 남았는지 남지 않았는지 판단하는 변수
          const isPastDue = row?.endAt
            ? row.endAt > today
            : false;
          return (
            <tr
              key={rowIndex}
              className={`${row.userParticipated ? styles.EndedRow : ''} 
              ${!isPastDue ? styles.EndedRow : ''}`}
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
                </div>
                <div className={styles.TitleDetails}>
                  <span
                    className={`${styles.Status} 
                      ${!row.userParticipated ? styles.InProgress : ''}
                      ${!row.userParticipated && !isPastDue ? styles.NotSubmitted : ''}`}
                  >
                    {/* 
                      case 1: 응시완료는 응시완료 텍스트를 보여준다. -> 배경색 grey
                      case 2: 응시 전인 경우 마감기한과 남은경우 비교해서 응시 전 텍스트를 보여준다. -> 배경색 white
                      case 3: 응시 전인 경우 마감기한이 끝난경우 비교해서 미응시 텍스트를 보여준다. -> 배경색 grey
                    */}
                    {row.userParticipated && '응시완료'}
                    {!row.userParticipated && isPastDue && '응시 전'}
                    {!row.userParticipated && !isPastDue && '미응시'}
                  </span>
                  <span>・</span>
                  <span className={styles.EndAt}>마감일 {row.endAt}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table4;
