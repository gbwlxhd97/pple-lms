function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function tileClassName({ date, view }: { date: Date; view: string }) {
  if (view === 'month' && date < new Date() && !isSameDay(date, new Date())) {
    return 'past-date';
  }
  return '';
}

export function durationFormatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const today = new Date().toISOString().split('T')[0];


export const endDate = () => {
  const list = [];
  // 날짜 범위 설정
  const startDate = new Date(2024, 5, 21); // 2024년 6월 21일
  const endDate = new Date(2024, 6, 31); // 2024년 7월 31일

  // 현재 날짜를 시작 날짜로 설정
  let currentDate = startDate;

  while (currentDate <= endDate) {
    // 날짜를 YYYY-MM-DD 형식으로 변환
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    // list에 추가
    list.push({
      label: `${year}-${month}-${day}`,
      type: `${year}-${month}-${day}`,
    });

    // 다음 날짜로 이동
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return list;
};
