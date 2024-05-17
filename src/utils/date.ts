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
