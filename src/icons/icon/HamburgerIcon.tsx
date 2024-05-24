import { IconProps } from '../types';
import HamburgerSvg from '@/assets/icon/hamburger.svg?react';
const HamburgerIcon = ({ width, height, onClick }: IconProps) => {
  return <HamburgerSvg width={width} height={height} onClick={onClick} />;
};

export default HamburgerIcon;
