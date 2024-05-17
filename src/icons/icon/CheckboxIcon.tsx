import CheckboxSvg from '@/assets/icon/checkbox.svg?react';
import { IconProps } from '../types';

const CheckboxIcon = ({ width, height, className }: IconProps) => {
  return <CheckboxSvg className={className} width={width} height={height} />;
};

export default CheckboxIcon;
