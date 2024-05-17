import ViteSvg from '@/assets/logo/vite.svg?react';
import { IconProps } from '../types';

const ViteLogoIcon = ({
  width,
  height,
  fill,
  stroke,
  className,
}: IconProps) => {
  return (
    <ViteSvg
      className={className}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
    />
  );
};

export default ViteLogoIcon;
