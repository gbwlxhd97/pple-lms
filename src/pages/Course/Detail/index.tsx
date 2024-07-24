import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import { useRouter } from '@/hooks/useRouter';
import courseAPIList from '@/services/course';
import useCourseNameStore from '@/stores/useCourseName';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import Title from '@/components/common/Title/Title';
import noticeAPIList from '@/services/notice';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from 'recharts';
import useProfileStore from '@/stores/useProfileStore';
import statisticsAPIList from '@/services/statistics';
import { ITotalStudent } from '@/interfaces/statistics';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const router = useRouter();
  const { setTitle } = useCourseNameStore();
  const {
    profile: { role },
  } = useProfileStore();
  const [courseData, setCourseData] = useState<any>();
  const [statisticsData, setStatisticsData] = useState<ITotalStudent>();
  const onPushAttendPage = () => {
    router.push(`/attendance/${courseId}`);
  };
  // 해당 과목 공지사항 및 과목명 반환
  const getCourseDatas = async () => {
    try {
      const res = await courseAPIList.getCoursePage(String(courseId));
      console.log(res);
      setTitle(res.courseName);
      setCourseData(res);
    } catch (error) {}
  };

  // 해당 과목 차시 데이터 생성
  const getCourseSection = async () => {
    const res = await courseAPIList.getCourseSection(String(courseId));
  };

  // 전체 학생 통계
  const getTotalStatistics = async () => {
    const res = await statisticsAPIList.getTotalStudentStatistics(
      Number(courseId)
    );
    console.log(res, '출석정보');
    setStatisticsData(res);
  };

  useEffect(() => {
    getCourseDatas();
    getCourseSection();
    getTotalStatistics();
  }, []);

  const statisPie = [
    { name: '출석', value: statisticsData?.attendStatisticsDto.present! },
    { name: '결석', value: statisticsData?.attendStatisticsDto.absent! },
  ];
  const assignmentPie = [
    { name: '제출', value: statisticsData?.homeworkStatisticsDto.submitted! },
    {
      name: '미제출',
      value: statisticsData?.homeworkStatisticsDto.notSubmitted!,
    },
  ];
  const totalObject = {
    statisticsTotal: statisPie.reduce(
      (sum, entry: any) => sum + entry.value,
      0
    ),
    assignmentTotal: assignmentPie.reduce(
      (sum, entry: any) => sum + entry.value,
      0
    ),
  };

  const totalRateObject = {
    statisticsRate: (statisPie[0]?.value / totalObject.statisticsTotal) * 100,
    assignmentRate:
      (assignmentPie[0]?.value / totalObject.assignmentTotal) * 100,
  };

  return (
    <div>
      <Card
        title="강좌 공지사항"
        emptyMsg="등록된 공지사항이 없습니다"
        options={courseData?.getNoticeListDTOList}
        titleiIsMore={true}
      />
      {role === 'TEACHER' && (
        <>
          <Title title="출석 학생 통계" isMore={true} />
          <div className={styles.CardWrap}>
            <ResponsiveContainer width={'100%'} height={200}>
              <PieChart>
                <Pie
                  data={statisPie}
                  cx="16%"
                  cy="30%"
                  innerRadius={30}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statisPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#82ca9d' : '#ff6b6b'}
                    />
                  ))}
                </Pie>
                <text
                  x="14%" // 차트 중앙에 위치시키기 위해 x 좌표와 y 좌표를 수정합니다.
                  y="32%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                  {`${totalRateObject.statisticsRate.toFixed(2)}%`}
                </text>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value, entry: any) => (
                    <span style={{ color: entry.color }}>
                      {` (${entry.payload.name}) ${entry.payload.value}`}
                    </span>
                  )}
                />
                <Pie
                  dataKey="value"
                  data={assignmentPie}
                  cx="16%"
                  cy="80%"
                  innerRadius={30}
                  outerRadius={40}
                  fill="#82ca9d"
                >
                  {assignmentPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#82ca9d' : '#ff6b6b'}
                    />
                  ))}
                </Pie>
                <text
                  x="14%" // 차트 중앙에 위치시키기 위해 x 좌표와 y 좌표를 수정합니다.
                  y="79%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                  {`${totalRateObject.assignmentRate.toFixed(2)}%`}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      {/* <div className={styles.CommonWrapper}>
        <Title title="출석정보" />
        <Button
          buttonType="Active"
          onClick={onPushAttendPage}
          className={styles.AttendButton}
        >
          출석정보확인
        </Button>
      </div> */}
      {/* <div className={styles.CommonWrapper}>
        <Title title="강의자료" />
        <Button
          buttonType="Active"
          className={styles.AttendButton}
          onClick={() => {
            router.push(`/course/reference/${courseId}`);
          }}
        >
          강의자료확인
        </Button>
      </div>
      <div className={styles.CommonWrapper}>
        <Title title="설문조사" />
        <Button
          buttonType="Active"
          className={styles.AttendButton}
          onClick={() => {
            router.push(`/course/${courseId}/survey`);
          }}
        >
          설 문
        </Button>
      </div> */}
    </div>
  );
};

export default CourseDetailPage;
