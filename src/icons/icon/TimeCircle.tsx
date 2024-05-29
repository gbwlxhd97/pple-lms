import TimeCircleSvg from '@/assets/icon/timer.svg?react'
import { IconProps } from '../types';

const TimeCircleIcon = ({ width, height, className, onClick }: IconProps) => {
  return (
    <TimeCircleSvg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    />
  );
};

export default TimeCircleIcon;
