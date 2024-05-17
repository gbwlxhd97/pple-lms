import CalendarSvg from '@/assets/icon/calendar.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const CalendarIcon = ({ width, height, stroke, className }: IconProps) => {
  return (
    <CalendarSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
    />
  );
};

export default CalendarIcon;
