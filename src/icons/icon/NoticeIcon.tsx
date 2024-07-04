import { IconProps } from '../types';
import NoticeSvg from '@/assets/icon/notice.svg?react';
const NoticeIcon = ({ width, height, onClick }: IconProps) => {
  return (
    <NoticeSvg
      width={width}
      height={height}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default NoticeIcon;
