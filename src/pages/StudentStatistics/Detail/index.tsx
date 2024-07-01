import commentAPIList from '@/services/comment';
import statisticsAPIList from '@/services/statistics';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styles from './index.module.scss';
import { ITotalStudent } from '@/interfaces/statistics';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const StudentStatisticsDetailPage = () => {
  const { courseId, studentId } = useParams();
  const [studentData, setStudentData] = useState<ITotalStudent | any>();

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

  const statisPie = [
    { name: '출석', value: studentData?.attendStatisticsDto.present || 0 },
    { name: '결석', value: studentData?.attendStatisticsDto.absent || 0 },
  ];

  const totalObject = {
    statisticsTotal: statisPie.reduce((sum, entry) => sum + entry.value, 0),
  };

  const totalRateObject = {
    statisticsRate: (statisPie[0]?.value / totalObject.statisticsTotal) * 100,
  };

  const COLORS = ['#67B472', '#ff6969'];

  useEffect(() => {
    getCommentInfo();
  }, []);
  // TODO: Chart 컴포넌트 분리해서 작업ㄴ
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Name}>{studentData?.name}</div>
        <div className={styles.Phone}>{studentData?.tel}</div>
        <div className={styles.ChartWrapper}>
          <PieChart width={250} height={250}>
            <Pie
              data={statisPie}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              cx="50%"
              cy="50%"
              paddingAngle={2}
            >
              {statisPie.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: '24px', fontWeight: 'bold' }}
            >
              {totalRateObject.statisticsRate.toFixed(0)}%
            </text>
          </PieChart>
          <div className={styles.Legend}>
            {statisPie.map((entry, index) => (
              <div key={`legend-${index}`} className={styles.LegendItem}>
                <span
                  className={styles.LegendColor}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={styles.LegendText}>
                  {entry.name}{' '}
                  <span className={`${styles.LegendValue} ${entry.name === '출석' ? styles.Green : styles.Red}`}>{entry.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* 위까지 차트 */}
      </div>
        <div className='Space'></div>
    </>
  );
};

export default StudentStatisticsDetailPage;
