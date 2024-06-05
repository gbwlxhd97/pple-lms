import FileIconSvg from '@/assets/icon/file.svg?react';
import { IconProps } from '../types';
/**
 *
 * 해당 아이콘은 stroke값이 default none입니다.
 */
const FileIcon = ({ width, height, className, stroke, onClick }: IconProps) => {
  return (
    <FileIconSvg
      className={className}
      width={width}
      height={height}
      stroke={stroke}
      onClick={onClick}
    />
  );
};

export default FileIcon;
