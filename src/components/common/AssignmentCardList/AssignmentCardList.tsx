import React, {
  useRef,
  useState,
  useEffect,
  TouchEvent,
  MouseEvent,
} from 'react';
import AssignmentCard from '@/components/common/AssignmentCard/AssignmentCard';
import styles from './AssignmentCardList.module.scss';

type AssignmentListProps = {
  dataList: Array<any>;
  title: string;
  description: string;
  dDay: string;
};

const AssignmentList = ({
  dataList,
  title,
  description,
  dDay,
}: AssignmentListProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    if (sliderRef.current) {
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1; // 스크롤 속도 조절
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (sliderRef.current) {
      const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div
      className={styles.MainAssignmentWrapper}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {dataList.map((item, i) => (
        <AssignmentCard
          isDragging={isDragging}
          key={i}
          dDay={dDay}
          description={description}
          title={title}
        />
      ))}
    </div>
  );
};

export default AssignmentList;
