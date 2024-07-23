import CheckAttendanceSvg from '@/assets/icon/checkAttendance.svg?react';
import { IconProps } from '../types';

const CheckAttendanceIcon = ({ width, height, className, onClick }: IconProps) => {
  return (
    <CheckAttendanceSvg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    />
  );
};

export default CheckAttendanceIcon;
