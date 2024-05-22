import Input from '@/components/common/Input/Input';
import styles from './SignUp.module.scss';
import Button from '@/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import memberAPIList from '@/services/member';
import { IRegister } from '@/interfaces/member';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
  };

  const handleClickAuthCode = async () => {
    const payload = {
      tel: '01055121231',
    };
    const res = await memberAPIList.memberIdentityCheck(payload);
    console.log(res);
  };

  const handleClickCheckAuthCode = async () => {
    const payload = {
      authCode: 0,
    };
    const res = await memberAPIList.memberIdentityCodeCheck(payload);
    console.log(res);
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
        >
          {isSendAuthCode ? '재전송' : '인증번호 받기 '}
        </Button>
      </div>
      {isSendAuthCode && (
        <>
          <div className={styles.LabelWrap}>인증번호</div>
          <div className={styles.Flex}>
            <input
              type="text"
              className={styles.WrapInput}
              placeholder="인증번호를 입력해주세요"
            />
            <Button
              className={styles.WrapButton}
              buttonType="Disabled"
              onClick={handleClickCheckAuthCode}
            >
              인증하기
            </Button>
          </div>
        </>
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
