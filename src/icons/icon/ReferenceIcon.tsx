import { IconProps } from '../types';
import ReferenceSvg from '@/assets/icon/reference.svg?react';
const ReferenceIcon = ({ width, height, onClick }: IconProps) => {
  return (
    <ReferenceSvg
      width={width}
      height={height}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default ReferenceIcon;
