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

type passwordInfo = {
  prePassword: string;
  newPassword: string;
  confirmPassword: string;
};
export function validateChangePassword(password: passwordInfo) {
  const isValidTrimPrePassword = password.prePassword.trim().length >= 6;
  const isValidTrimNewPassword = password.newPassword.trim().length >= 6;
  const isValidTrimConfirmPassword =
    password.confirmPassword.trim().length >= 6;
  const isMatch = password.newPassword === password.confirmPassword;
  return (
    isValidTrimPrePassword &&
    isValidTrimNewPassword &&
    isValidTrimConfirmPassword &&
    isMatch
  );
}
