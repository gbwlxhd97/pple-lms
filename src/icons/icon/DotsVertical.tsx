import DotsVerticalSvg from '@/assets/icon/dots_vertical.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const DotsVerticalIcon = ({ width, height, stroke, className }: IconProps) => {
  return (
    <DotsVerticalSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
    />
  );
};

export default DotsVerticalIcon;
