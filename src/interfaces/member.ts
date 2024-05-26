export interface IRegister {
  name: string;
  tel: string;
  password: string;
  email: string;
  memberRole: 'STUDENT' | 'TEACHER';
  parent_tel: string;
  passwordConfirm: string;
  passwordMatch?: boolean;
}


export interface IMainPageResponse {
  userName: string;
  courseNameDtos: Array<{
    id: number;
    title: string;
    writeAt: string;
  }>;
  lmsNoticeDtos: Array<{
    id: number;
    title: string;
    writeAt: string;
  }>;
  homeworkDtos: any;
}