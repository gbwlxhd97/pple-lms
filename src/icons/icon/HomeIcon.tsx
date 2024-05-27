import { IconProps } from '../types';
import HomeSvg from '@/assets/icon/home.svg?react';
const HomeIcon = ({ width, height, onClick }: IconProps) => {
  return (
    <HomeSvg
      width={width}
      height={height}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default HomeIcon;
