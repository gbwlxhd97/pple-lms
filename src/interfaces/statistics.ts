
interface attendStatisticsDto {
  yearMonth: any;
  present: number;
  absent: number;
}


interface homeworkStatisticsDto {
  yearMonth: any;
  submitted: number;
  notSubmitted: number;
}

export interface ITotalStudent {
  attendStatisticsDto: attendStatisticsDto;
  homeworkStatisticsDto: homeworkStatisticsDto;
}