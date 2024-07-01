import React from 'react';
import { TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<any, any> {
  // 원하는 추가 props가 있으면 여기에 정의
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p
          className="intro"
          style={{ margin: 0, color: '#FF6969' }}
        >{`전체학생수: ${payload[0].value}`}</p>
        <p
          className="desc"
          style={{ margin: 0, color: '#67B472' }}
        >{`출석학생수: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
