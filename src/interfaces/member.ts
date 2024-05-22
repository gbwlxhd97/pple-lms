export interface IRegister {
  name: string;
  tel: string;
  password: string;
  email: string;
  memberRole: 'STUDENT' | 'TEACHER';
  parent_tel: string;
}
