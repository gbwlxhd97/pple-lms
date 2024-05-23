import Button from '@/components/common/Button/Button';
import styles from './SignIn.module.scss';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/common/Input/Input';
import { useRouter } from '@/hooks/useRouter';
import authAPIList from '@/services/auth';
import { handleKeyDown } from '@/utils';
import Cookies from 'js-cookie';

const SignInPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    tel: '',
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
    loginInfo.tel.length > 0 && loginInfo.password.length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await authAPIList.login(loginInfo);
      console.log(res);
      if (res) {
        Cookies.set('memberSessionKey', res);
        router.push('/main');
      }
    } catch (error) {
      console.log(error);
    }
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
        type="tel"
        placeholder="전화번호를 입력하세요"
        name="tel"
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
        onKeyDown={(e) => handleKeyDown(e, handleLogin)}
      />
      <Button
        buttonType={isValidateButton ? 'Active' : 'Disabled'}
        className={styles.LoginButton}
        onClick={handleLogin}
      >
        로그인
      </Button>
      <Button
        buttonType="Abled"
        className={styles.LoginButton}
        onClick={() => {
          router.push('/sign-up');
        }}
      >
        회원가입
      </Button>
    </div>
  );
};

export default SignInPage;
