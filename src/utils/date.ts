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
/**
 * 
 * return YYYY-MM-DD
 */
export const today = () => {
  const kstOffset = 9 * 60 * 60 * 1000; // KST의 시간 오프셋 (밀리초 단위)
    const now = new Date(Date.now() + kstOffset);
    return now.toISOString().split('T')[0];
}


export const endDate = () => {
  const list = [];
  const kstOffset = 9 * 60 * 60 * 1000;
  const today = new Date(Date.now() + kstOffset);
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    list.push({
      label: `${year}-${month}-${day}`,
      type: `${year}-${month}-${day}`,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return list;
};
