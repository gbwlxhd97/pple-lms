import { IconProps } from '../types';
import SurveySvg from '@/assets/icon/survey.svg?react';
const SurveyIcon = ({ width, height, onClick }: IconProps) => {
  return (
    <SurveySvg
      width={width}
      height={height}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default SurveyIcon;
