import commentAPIList from '@/services/comment';
import statisticsAPIList from '@/services/statistics';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styles from './index.module.scss';
import { ITotalStudent } from '@/interfaces/statistics';
import StudentInfoChart from '@/components/common/StudentInfoChart';
import Button from '@/components/common/Button/Button';
import CommentInput from '@/components/common/CommentInput';
import { IComments } from '@/interfaces/comment';


const StudentStatisticsDetailPage = () => {
  const { courseId, studentId } = useParams();
  const [studentData, setStudentData] = useState<ITotalStudent | any>();
  const [isShowInput, setIsShowInput] = useState(false);
  const [commentData, setCommentData] = useState<Array<IComments>>([]);
  const getCommentInfo = async () => {
    try {
      const res = await statisticsAPIList.getStudentDetailStatistics(
        Number(courseId),
        Number(studentId)
      );
      console.log(res);
      setStudentData(res);
    } catch (error) {
      console.error(error);
    }
  };


  const getDetailComments = async () => {
    try {
      const res = await commentAPIList.getStudentComments(
        Number(courseId),
        Number(studentId)
      );
      console.log(res);
      setCommentData(
        res
      )
    } catch (error) {
      
    }
    
  }



  useEffect(() => {
    getCommentInfo();
    getDetailComments()
  }, []);
  return (
    <>
      <StudentInfoChart studentData={studentData} />
      <div className="Space"></div>
      <div className={styles.CommentTitle}>학생 코멘트</div>
      <div className={styles.CommentWrap}>
        {commentData.map((comment, index) => (
          <div className={styles.CommentCard}>
            <span>{comment.courseSectionId}차시 - </span>
            {comment.main}
          </div>
        ))}
      </div>
      <Button
        buttonType="Active"
        className={styles.CommentButton}
        onClick={() => {
          setIsShowInput(true);
        }}
      >
        코멘트 추가
      </Button>
      {isShowInput && (
        <>
          <CommentInput
            memberId={studentData.studentId}
            fetchComments={getDetailComments}
          />
        </>
      )}
    </>
  );
};

export default StudentStatisticsDetailPage;
