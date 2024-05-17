import ArrowRightSvg from '@/assets/icon/arrow_right.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 fill값이 default none입니다.
 */
const ArrowRightIcon = ({ width, height, stroke, className }: IconProps) => {
  return (
    <ArrowRightSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
    />
  );
};

export default ArrowRightIcon;
