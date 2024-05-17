import EditIconSvg from '@/assets/icon/edit.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const EditIcon = ({ width, height, className, stroke, onClick }: IconProps) => {
  return (
    <EditIconSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
      onClick={onClick}
    />
  );
};

export default EditIcon;
