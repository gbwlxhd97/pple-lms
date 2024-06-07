export interface INotice {
  title: string;
  content: string;
  sendType: '' | 'STUDENT' | 'PARENTS';
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
