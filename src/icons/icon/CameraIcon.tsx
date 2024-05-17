import CameraSvg from '@/assets/icon/camera.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const CameraIcon = ({ width, height, className, stroke }: IconProps) => {
  return (
    <CameraSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
    />
  );
};

export default CameraIcon;
