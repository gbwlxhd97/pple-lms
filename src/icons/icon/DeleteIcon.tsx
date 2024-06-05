import DeleteSvg from '@/assets/icon/delete.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const DeleteIcon = ({ width, height, className, stroke, onClick }: IconProps) => {
  return (
    <DeleteSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
      onClick={onClick}
    />
  );
};

export default DeleteIcon;
