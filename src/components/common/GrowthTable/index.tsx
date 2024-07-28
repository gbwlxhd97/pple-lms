import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styles from './index.module.scss';
import { useParams } from 'react-router';
import { useRouter } from '@/hooks/useRouter';
import StudentStatisticsDetailComponents from '@/components/studentStatisticsDetail';
import { customStyles } from '@/utils/constant';

interface Table5Props {
  tableHead: string[]; // 테이블의 각 열 제목
  tableBody: any[]; // 각 행의 데이터 배열
}

const GrowthTable = ({ tableBody, tableHead }: Table5Props) => {
  const router = useRouter();
  const { courseId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );

  const openModal = (memberId: number) => {
    setSelectedStudentId(memberId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudentId(null);
  };

  return (
    <div className={styles.Container}>
      <table className={styles.table}>
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
              onClick={() => {
                openModal(row.memberId);
              }}
            >
              <td className={styles.Name}>{row.name}</td>
              <td className={styles.Tel}>
                <div>{row.main}</div>
              </td>
            </tr>
          ))}
          {tableBody.length === 0 && (
            <tr className={'EmptyData'}>정보가 없습니다.</tr>
          )}
        </tbody>
      </table>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="학생 상세 정보"
        style={customStyles}
      >
        {selectedStudentId !== null && (
          <StudentStatisticsDetailComponents
            courseId={Number(courseId)}
            studentId={selectedStudentId}
          />
        )}
      </ReactModal>
    </div>
  );
};

export default GrowthTable;
