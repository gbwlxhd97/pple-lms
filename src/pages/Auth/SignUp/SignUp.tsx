import Input from '@/components/common/Input/Input';
import styles from './SignUp.module.scss';
import Button from '@/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import memberAPIList from '@/services/member';
import { IRegister } from '@/interfaces/member';
import Timer from '@/components/common/Timer/Timer';

const SignUpPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [signUpInfo, setSignUpInfo] = useState<IRegister>({
    name: '',
    tel: '',
    password: '',
    email: '',
    memberRole: 'STUDENT', // select default
    parent_tel: '',
  });
  const [isSendAuthCode, setIsSendAuthCode] = useState<boolean>(false);
  const [isValidateSignUp, setIsValidateSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoadin] = useState(false);
  /**
   * 하위 3개 state는 timer 관련 state입니다.
   */
  const [durationTime, setDurationTime] = useState(300);
  const [isAuthCodeComplete, setisAuthCodeComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
  };

  const handleClickAuthCode = async () => {
    setIsLoadin(true);
    //만약 재전송인경우 타임을 리셋한다.
    if (isAuthCodeComplete) {
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
          type="text"
          placeholder="전화번호를 입력하세요"
          className={styles.WrapInput}
          name="tel"
          onChange={handleChange}
        />
        <Button
          className={styles.WrapButton}
          buttonType={signUpInfo.tel?.length > 0 ? 'Active' : 'Disabled'}
          onClick={handleClickAuthCode}
          isLoading={isLoading}
        >
          {isSendAuthCode ? '재전송' : '인증번호 받기'}
        </Button>
      </div>
      {isSendAuthCode && (
        <Timer
          duration={durationTime}
          onComplete={() => setisAuthCodeComplete(true)}
          isComplete={isAuthCodeComplete}
        />
      )}

      <Input
        label="비밀번호를 입력하세요"
        name="password"
        type="text"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <Input label="비밀번호 확인" type="text" placeholder="비밀번호 확인" />
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
        placeholder="보호자 전화번호를 입력하세요"
        name="parent_tel"
        onChange={handleChange}
      />

      <Button
        buttonType={isValidateSignUp ? 'Active' : 'Disabled'}
        className={styles.LoginButton}
      >
        회원가입
      </Button>
    </>
  );
};

export default SignUpPage;
