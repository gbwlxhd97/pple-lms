import { IRegister } from '@/interfaces/member';

export function validateForm(info: IRegister, phoneAuthorization: boolean) {
  const isNameValid = info.name.trim() !== '';
  const isTelValid = info.tel.trim() !== '';
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
  const isPasswordValid = info.password.length >= 6;
  const isPasswordConfirmValid = info.password === info.passwordConfirm;

  return (
    isNameValid &&
    isTelValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    phoneAuthorization
  );
}
