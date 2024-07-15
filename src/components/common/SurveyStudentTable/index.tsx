import React from 'react';
import styles from './index.module.scss';
import { useRouter } from '@/hooks/useRouter';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

type SurveyStudentTableProps = {
  tableHead: Array<string>;
  tableBody: Array<any>;
  path?: string;
};

const SurveyStudentTable = ({ tableHead, tableBody, path }: SurveyStudentTableProps) => {
  const router = useRouter();
  const { courseId,surveyId } = useParams();
  const onPushShowSurveyPage = (memberId:number) => {
    router.push(
      `/course/${courseId}/survey/${surveyId}/show-survey/${memberId}`
    );
  }
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
            <tr
              key={index}
              onClick={() => {
                onPushShowSurveyPage(row.id);
                // toast.error("개별 보기는 준비중인 기능입니다.")
              }}
            >
              <td>{tableBody.length - index}</td>
              <td>{row.name}</td>
              {row.tel && <td>{row.tel}</td>}
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

export default SurveyStudentTable;
