import RadioIconSvg from '@/assets/icon/radio.svg?react';
import { IconProps } from '../types';

const RadioIcon = ({ width, height, className, onClick }: IconProps) => {
  return (
    <RadioIconSvg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    />
  );
};

export default RadioIcon;
