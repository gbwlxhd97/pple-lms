import React, { useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from '@/hooks/useRouter';
import { useParams } from 'react-router';
import ReactModal from 'react-modal';
import { customStyles } from '@/utils/constant';
import StudentStatisticsDetailComponents from '@/components/studentStatisticsDetail';

type StudentTableProps = {
  tableHead: Array<string>;
  tableBody: Array<any>;
  path?: string;
};

const StudentTable = ({ tableHead, tableBody, path }: StudentTableProps) => {
  const router = useRouter();
  const { courseId } = useParams();
  const goPushPath = (studentId: string, studentState: any) => {
    router.push(
      `/course/${courseId}/statistics/detail/${studentId}`,
      {},
      studentState
    );
  };
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
                openModal(row.id);
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

export default StudentTable;
