import ArrowLeftTailSvg from '@/assets/icon/arrow_left_tail.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const ArrowLeftTailIcon = ({
  width,
  height,
  stroke,
  className,
  onClick,
}: IconProps) => {
  return (
    <ArrowLeftTailSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
      onClick={onClick}
    />
  );
};

export default ArrowLeftTailIcon;
