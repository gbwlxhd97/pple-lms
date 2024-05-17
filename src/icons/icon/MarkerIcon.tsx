import MarkerSvg from '@/assets/icon/marker.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const MarkerIcon = ({ width, height, stroke, className }: IconProps) => {
  return (
    <MarkerSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
    />
  );
};

export default MarkerIcon;
