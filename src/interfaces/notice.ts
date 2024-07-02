export interface INotice {
  title: string;
  main: string;
  sendType: '' | 'STUDENT' | 'PARENTS';
  category: string;
}

export interface INoticeList {
  createdAt: string;
  id: number;
  num: number;
  title: string;
  writerName: string;
}

export interface INoticeDetail {
  createdAt: string;
  id: number;
  num: number;
  title: string;
  writerName: string;
  main: string;
}
