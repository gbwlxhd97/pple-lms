import styles from './Mypage.module.scss';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '이세영',
    phoneNumber: '01063536353',
    email: 'lsy1234@naver.com',
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidateButton =
    password.currentPassword.length > 0 &&
    password.newPassword.length > 0 &&
    password.confirmPassword.length > 0 &&
    password.newPassword === password.confirmPassword;

  return (
    <>
      <div className={styles.MypageContainer}>
        <div className={styles.Info}>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>이름</span>
            <span>{userInfo.name}</span>
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>핸드폰</span>
            <span>{userInfo.phoneNumber}</span>
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>이메일</span>
            <span>{userInfo.email}</span>
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>비밀번호 변경</span>
            <Input
              name="currentPassword"
              type="password"
              placeholder="기존 비밀번호"
              onChange={handleChange}
            />
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}> </span>
            <Input
              name="newPassword"
              type="password"
              placeholder="새 비밀번호"
              onChange={handleChange}
            />
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}> </span>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="새 비밀번호 확인"
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          buttonType={isValidateButton ? 'Active' : 'Disabled'}
          className={styles.EditButton}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default MyPage;
