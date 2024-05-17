import Input from '@/components/common/Input/Input';
import styles from './SignUp.module.scss';
import Button from '@/components/common/Button/Button';
import { useEffect, useRef } from 'react';

const SignUpPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Input label="이름" type="text" placeholder="이름" ref={inputRef} />
      <div className={styles.LabelWrap}>전화번호</div>
      <div className={styles.Flex}>
        <input type="text" className={styles.WrapInput} />
        <Button className={styles.WrapButton} buttonType="Disabled">
          인증번호 받기
        </Button>
      </div>
      <div className={styles.LabelWrap}>인증번호</div>
      <div className={styles.Flex}>
        <input type="text" className={styles.WrapInput} />
        <Button className={styles.WrapButton} buttonType="Disabled">
          재전송
        </Button>
      </div>
      <Input label="비밀번호" type="text" placeholder="비밀번호" />
      <Input label="비밀번호 확인" type="text" placeholder="비밀번호 확인" />
      <Input label="Email" type="text" placeholder="Email" />
      <Input
        label="보호자 전화번호"
        type="number"
        placeholder="보호자 전화번호를 입력하세요"
      />

      <Button
        buttonType={false ? 'Primary' : 'Disabled'}
        className={styles.LoginButton}
      >
        회원가입
      </Button>
    </>
  );
};

export default SignUpPage;
