import { IRegister } from '@/interfaces/member';
import { IAnswerSurvey, IQuestions, ISurvey } from '@/interfaces/survey';

export function validateForm(info: IRegister, phoneAuthorization: boolean) {
  const isNameValid = info.name.trim() !== '';
  const isTelValid = info.tel.trim() !== '';
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
  const isPasswordValid = info.password.length >= 6;
  const isPasswordConfirmValid = info.password === info.passwordConfirm;
  console.log(info,"김인");
  
  const isAgencyValid = info.agencyId !== 0;
  return (
    isNameValid &&
    isTelValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    isAgencyValid &&
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

export const validateSurveyAnswerForm = (
  answer: IAnswerSurvey,
  questions: IQuestions[]
): boolean => {
  console.log(answer,"앤서의향연ㄴ");
  
  return answer.answerDtos.every((dto:any) => {
    const question = questions.find((q) => q.id === dto.id);
    if (!question) {
      return false;
    }
    
    if (question.questionType === 'SHORT_ANSWER') {
      return dto.answerText?.trim()?.length > 0;
    }

    if (
      question.questionType === 'MULTIPLE_CHOICE' ||
      question.questionType === 'SINGLE_CHOICE'
    ) {
      return dto.choiceIds?.length > 0;
    }

    return false;
  });
};