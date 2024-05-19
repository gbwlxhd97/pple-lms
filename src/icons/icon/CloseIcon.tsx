import { IconProps } from '../types';
import CloseSvg from '@/assets/icon/close.svg?react';

const CloseIcon = ({ width, height }: IconProps) => {
  return <CloseSvg width={width} height={height} />;
};

export default CloseIcon;
