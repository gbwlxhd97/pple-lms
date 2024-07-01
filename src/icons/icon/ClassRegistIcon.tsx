import { IconProps } from '../types';
import ClassRegistSvg from '@/assets/icon/class_regist.svg?react';

const ClassRegistIcon = ({ width, height, onClick }: IconProps) => {
  return (
    <ClassRegistSvg
      width={width}
      height={height}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default ClassRegistIcon;
