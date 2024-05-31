export interface IRegister {
  name: string;
  tel: string;
  password: string;
  email: string;
  memberRole: 'STUDENT' | 'TEACHER';
  passwordConfirm: string;
  passwordMatch?: boolean;
}

export interface IMainPageResponse {
  userName: string;
  courseNameDtos: Array<{
    id: number;
    title: string;
    createdAt: string;
  }>;
  lmsNoticeDtos: Array<{
    id: number;
    title: string;
    createdAt: string;
  }>;
  homeworkDtos: any;
}
