import Button from '@/components/common/Button/Button';
import styles from './SignIn.module.scss';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/common/Input/Input';
import { useRouter } from '@/hooks/useRouter';
import authAPIList from '@/services/auth';
import { handleKeyDown } from '@/utils';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import useProfileStore from '@/stores/useProfileStore';

const SignInPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    tel: '',
    password: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {setProfile} = useProfileStore()
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
      if (res) {
        Cookies.set('memberSessionKey', res);
        console.log(res);
        const { name, role } = await authAPIList.profile(); 
        setProfile({ name, role }); ;
        router.push('/main');
      }
    } catch (error) {
      console.log(error);
      toast.error(
        '전화번호 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 전화번호 입니다.'
      );
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
        type="number"
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
