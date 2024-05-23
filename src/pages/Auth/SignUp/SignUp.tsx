import Input from '@/components/common/Input/Input';
import styles from './SignUp.module.scss';
import Button from '@/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import memberAPIList from '@/services/member';
import { IRegister } from '@/interfaces/member';
import Timer from '@/components/common/Timer/Timer';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { useRouter } from '@/hooks/useRouter';
import { validateForm } from '@/utils/validate';

const SignUpPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [signUpInfo, setSignUpInfo] = useState<IRegister>({
    name: '',
    tel: '',
    password: '',
    email: '',
    memberRole: 'STUDENT', // select default
    parent_tel: '',
    passwordConfirm: '',
    passwordMatch: false,
  });
  const [isSendAuthCode, setIsSendAuthCode] = useState<boolean>(false);
  const [isLoading, setIsLoadin] = useState(false);

  const router = useRouter();

  /**
   * 하위 3개 state는 timer 관련 state입니다.
   */
  const [durationTime, setDurationTime] = useState(300);
  const [isAuthCodeComplete, setisAuthCodeComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpInfo((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };

      return {
        ...updatedState,
        passwordMatch: updatedState.password === updatedState.passwordConfirm,
      };
    });
  };

  const handleClickAuthCode = async () => {
    setIsLoadin(true);
    //만약 재전송인경우 타임을 리셋한다.
    if (!isAuthCodeComplete) {
      setDurationTime(300);
    }
    try {
      const payload = {
        tel: signUpInfo.tel,
      };
      const res = await memberAPIList.memberIdentityCheck(payload);
      if (res) {
        setIsSendAuthCode(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadin(false);
    }
  };

  const handleSubmit = async () => {
    const res = await memberAPIList.memberRegister(signUpInfo);
    console.log(res);
    if (res) {
      router.push('/main');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isFormValid = validateForm(signUpInfo, isAuthCodeComplete);
  console.log(isFormValid);

  return (
    <>
      <Input
        label="이름"
        type="text"
        placeholder="이름을 입력하세요"
        ref={inputRef}
        name="name"
        onChange={handleChange}
      />
      <div className={styles.LabelWrap}>전화번호</div>
      <div className={styles.Flex}>
        <input
          type="number"
          placeholder="전화번호를 입력하세요 (-) 제외하고 입력하세요"
          className={styles.WrapInput}
          name="tel"
          onChange={handleChange}
          disabled={isAuthCodeComplete}
        />
        <Button
          className={styles.WrapButton}
          buttonType={
            isAuthCodeComplete
              ? 'Disabled'
              : signUpInfo.tel?.length > 0
                ? 'Active'
                : 'Disabled'
          }
          onClick={handleClickAuthCode}
          isLoading={isLoading}
        >
          {isAuthCodeComplete
            ? '인증완료'
            : isSendAuthCode
              ? '재전송'
              : '인증번호 받기'}
        </Button>
      </div>
      {isSendAuthCode && (
        <Timer
          duration={durationTime}
          onComplete={setisAuthCodeComplete}
          isComplete={isAuthCodeComplete}
        />
      )}

      <Input
        label="비밀번호를 입력하세요"
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 확인"
        name="passwordConfirm"
        onChange={handleChange}
      />
      {signUpInfo.passwordConfirm.length > 0 && !signUpInfo.passwordMatch && (
        <div className={styles.PasswordMissMatch}>
          비밀번호가 일치하지 않습니다.
        </div>
      )}
      <Input
        label="Email"
        name="email"
        type="text"
        placeholder="Email을 입력하세요"
        onChange={handleChange}
      />
      <Input
        label="보호자 전화번호"
        type="number"
        placeholder="보호자 전화번호를 입력하세요 (-) 제외하고 입력하세요"
        name="parent_tel"
        onChange={handleChange}
      />
      <div className={styles.FlexCheckBoxWrap}>
        <CheckBox
          checkBoxType={
            signUpInfo.memberRole === 'STUDENT' ? 'Active' : 'Default'
          }
          onClick={() => {
            setSignUpInfo((prev) => ({
              ...prev,
              memberRole: 'STUDENT',
            }));
          }}
        >
          학생
        </CheckBox>
        <CheckBox
          checkBoxType={
            signUpInfo.memberRole === 'TEACHER' ? 'Active' : 'Default'
          }
          onClick={() => {
            setSignUpInfo((prev) => ({
              ...prev,
              memberRole: 'TEACHER',
            }));
          }}
        >
          선생님
        </CheckBox>
      </div>
      <Button
        buttonType={isFormValid ? 'Active' : 'Disabled'}
        className={styles.LoginButton}
        onClick={handleSubmit}
      >
        회원가입
      </Button>
    </>
  );
};

export default SignUpPage;
