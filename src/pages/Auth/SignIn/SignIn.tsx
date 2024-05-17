import Button from '@/components/common/Button/Button';
import styles from './SignIn.module.scss';
import { useState } from 'react';
import Input from '@/components/common/Input/Input';



const SignInPage = () => {
    const [loginInfo,setLoginInfo] = useState({
      id: '',
      password:''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
    }

    const isValidateButton = loginInfo.id.length > 0 && loginInfo.password.length >0
    
    console.log(loginInfo);
    
    return (
        <div className={styles.SignInContainer}>
          <h2>AI&SW<br/>새싹인재 양성교육</h2>
            <Input type='text' placeholder='전화번호를 입력하세요' name="id" onChange={handleChange} label='전화번호' />
            <Input type='password' placeholder='비밀번호를 입력하세요' name='password' onChange={handleChange} label='비밀번호' />
            <Button buttonType={isValidateButton ? 'Primary' : 'Disabled'} className={styles.LoginButton}>로그인</Button>
            <Button buttonType='Primary' className={styles.LoginButton}>회원가입</Button>
        </div>
      );
}

export default SignInPage;