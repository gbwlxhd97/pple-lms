import Button from '@/components/common/Button/Button';
import styles from './SignIn.module.scss';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/common/Input/Input';
import { useRouter } from '@/hooks/useRouter';

const SignInPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    id: '',
    password: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
  };

  const isValidateButton =
    loginInfo.id.length > 0 && loginInfo.password.length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePushRouter = (route: string) => {
    route === 'login' ? router.push('/home') : router.push('/sign-up');
  };

  return (
    <div className={styles.SignInContainer}>
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        AI&SW
        <br />
        새싹인재 양성교육
      </h2>
      <Input
        type="text"
        placeholder="전화번호를 입력하세요"
        name="id"
        onChange={handleChange}
        label="전화번호"
        ref={inputRef}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        name="password"
        onChange={handleChange}
        label="비밀번호"
      />
      <Button
        buttonType={isValidateButton ? 'Active' : 'Disabled'}
        className={styles.LoginButton}
        onClick={() => {
          handlePushRouter('login');
        }}
      >
        로그인
      </Button>
      <Button
        buttonType="Abled"
        className={styles.LoginButton}
        onClick={() => {
          handlePushRouter('sign-up');
        }}
      >
        회원가입
      </Button>
    </div>
  );
};

export default SignInPage;
