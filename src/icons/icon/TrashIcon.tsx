import { IconProps } from '../types';
import TrashSvg from '@/assets/icon/trash.svg?react';
const TrashIcon = ({ width, height,onClick,className }: IconProps) => {
  return <TrashSvg width={width} height={height} onClick={onClick} className={className} />;
};

export default TrashIcon;
