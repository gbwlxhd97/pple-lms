import PlusSvg from '@/assets/icon/plus.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const PlusIcon = ({ width, height, className, stroke }: IconProps) => {
  return (
    <PlusSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
    />
  );
};

export default PlusIcon;
