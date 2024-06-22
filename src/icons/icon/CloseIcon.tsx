import { IconProps } from '../types';
import CloseSvg from '@/assets/icon/close.svg?react';

const CloseIcon = ({ width, height, onClick,className }: IconProps) => {
  return (
    <CloseSvg
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  );
};

export default CloseIcon;
