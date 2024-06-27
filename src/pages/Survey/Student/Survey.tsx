import styles from './Survey.module.scss';
import Title from '@/components/common/Title/Title';
import Table4 from '@/components/common/Table4/Table4';
import { useParams } from 'react-router';
import surveyAPIList from '@/services/survey';
import { useEffect, useState } from 'react';
import { today } from '@/utils/date';

const SurveyStudentPage = () => {
  const { courseId } = useParams();
  const [surveyList,setSurveyList] = useState([]);
  const getSurveyList = async () => {
    try {
      const res = await surveyAPIList.getStudentSurveyList(Number(courseId));
      console.log(res);
      const updatedData = res.map((item:any) => ({
        ...item,
        isNew: item.createdAt === today,
      }));
      console.log(updatedData);
      setSurveyList(updatedData);
    } catch (error) {
      
    }
  }
  useEffect(()=> {
    getSurveyList()

  },[])
  // const surveyList = [
  //   {
  //     id: 1,
  //     title: '설문 제목입니다.',
  //     titleDetails: { status: '응시 전', endAt: '2024.06.20' },
  //   },
  //   {
  //     id: 2,
  //     title: '수학 레포트',
  //     titleDetails: { status: '응시 전', endAt: '2024.06.18' },
  //   },
  //   {
  //     id: 3,
  //     title: '과학 과제',
  //     titleDetails: { status: '응시완료', endAt: '2024.03.02' },
  //   },
  //   {
  //     id: 4,
  //     title: '과학 과제',
  //     titleDetails: { status: '미응시', endAt: '2024.03.02' },
  //   },
  //   {
  //     id: 5,
  //     title: '국어 과제',
  //     titleDetails: { status: '미응시', endAt: '2024.03.02' },
  //   },
  //   {
  //     id: 6,
  //     title: '과학 과제',
  //     titleDetails: { status: '응시완료', endAt: '2024.03.02' },
  //   },
  //   {
  //     id: 7,
  //     title: '국어 과제',
  //     titleDetails: { status: '응시완료', endAt: '2024.03.02' },
  //   },
  //   {
  //     id: 8,
  //     title: '국어 과제',
  //     titleDetails: { status: '응시완료', endAt: '2024.03.02' },
  //   },
  // ];
  return (
    <>
      <Title title="설문" />
      <div className={styles.SurveyTable}>
        <Table4
          tableHead={['번호', '제목']}
          tableBody={surveyList || []}
          path={`/course/${courseId}/survey`}
        />
      </div>
    </>
  );
};

export default SurveyStudentPage;
