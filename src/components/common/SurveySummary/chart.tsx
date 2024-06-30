
import React from 'react';
import styles from './chart.module.scss'
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type SummaryChartProps = {
  title: string;
  chartData: Array<any>
}

const SummaryChart = ({title,chartData}:SummaryChartProps) => {
  return (
    <>
      <div className={styles.QuestionTitle}>{title}</div>
      <ResponsiveContainer width={'100%'} height={'50%'}>
        <BarChart data={chartData} dataKey="count">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="text" />
          <YAxis />
          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default SummaryChart;