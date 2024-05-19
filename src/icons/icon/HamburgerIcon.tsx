import { IconProps } from '../types';
import HamburgerSvg from '@/assets/icon/hamburger.svg?react';
const HamburgerIcon = ({ width, height }: IconProps) => {
  return <HamburgerSvg width={width} height={height} />;
};

export default HamburgerIcon;
