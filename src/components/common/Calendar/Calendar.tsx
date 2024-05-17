import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.module.scss';
import { Value } from 'node_modules/react-calendar/dist/cjs/shared/types';
import { ArrowRightIcon } from '@/icons/icon';
import styles from './Calendar.module.scss';
import { tileClassName } from '@/utils/date';
const CMCalendar = () => {
  const [date, setDate] = useState<Value>(new Date()); // 현재 날짜로 초기화

  const onChange = (selectedDate: Value) => {
    setDate(selectedDate);
  };

  return (
    <>
      <Calendar
        onChange={onChange}
        value={date}
        calendarType="gregory"
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        tileClassName={tileClassName}
        prevLabel={
          <ArrowRightIcon
            width={20}
            height={20}
            className={styles.PrevArrowIcon}
          />
        }
        nextLabel={
          <ArrowRightIcon
            width={20}
            height={20}
            className={styles.NextArrowIcon}
          />
        }
        formatDay={(_locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        showNeighboringMonth={false}
      />
    </>
  );
};

export default CMCalendar;
