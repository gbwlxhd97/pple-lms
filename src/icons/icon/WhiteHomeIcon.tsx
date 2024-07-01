import { IconProps } from '../types';
import WhiteHomeSvg from '@/assets/icon/white_home.svg?react';
const WhiteHomeIcon = ({ width, height, onClick }: IconProps) => {
  return (
    <WhiteHomeSvg
      width={width}
      height={height}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default WhiteHomeIcon;
