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
        <table className={styles.InfoTable}>
          <tr>
            <th>이름</th>
            <td>{userInfo.name}</td>
          </tr>
          <tr>
            <th>핸드폰</th>
            <td>{userInfo.phoneNumber}</td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <th>비밀번호 변경</th>
            <td>
              <Input
                name="currentPassword"
                type="password"
                placeholder="기존 비밀번호"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <Input
                name="newPassword"
                type="password"
                placeholder="새 비밀번호"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="새 비밀번호 확인"
                onChange={handleChange}
              />
            </td>
          </tr>
        </table>
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
