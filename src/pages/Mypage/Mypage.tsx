import styles from './Mypage.module.scss';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import useProfileStore from '@/stores/useProfileStore';
import authAPIList from '@/services/auth';
import toast from 'react-hot-toast';

const MyPage = () => {
  const [password, setPassword] = useState({
    prePassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { profile } = useProfileStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    try {
      const payload = {
        prePassword: password.prePassword,
        newPassword: password.newPassword,
      };
      const res = await authAPIList.changePassword(payload);
      console.log(res);
      if (res) {
        toast.success('비밀번호 변경 완료!');
        setPassword({
          prePassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      // TODO: 비밀번호 틀린거 코드 받기
      toast.error('에러 발생 비밀번호를 확인해주세요.');
    }
  };

  const isValidateButton =
    password.prePassword.length >= 6 &&
    password.newPassword.length >= 6 &&
    password.confirmPassword.length >= 6 &&
    password.newPassword === password.confirmPassword;

  return (
    <>
      <div className={styles.MypageContainer}>
        <div className={styles.Info}>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>이름</span>
            <span>{profile.name}</span>
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>핸드폰</span>
            <span>{profile.tel}</span>
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>이메일</span>
            <span>{profile.email}</span>
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}>비밀번호 변경</span>
            <Input
              name="prePassword"
              type="password"
              placeholder="기존 비밀번호"
              onChange={handleChange}
              value={password.prePassword}
            />
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}> </span>
            <Input
              name="newPassword"
              type="password"
              placeholder="새 비밀번호"
              onChange={handleChange}
              value={password.newPassword}
            />
          </div>
          <div className={styles.InfoRow}>
            <span className={styles.InfoLabel}> </span>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="새 비밀번호 확인"
              onChange={handleChange}
              value={password.confirmPassword}
            />
          </div>
        </div>
        {password.newPassword.length > 0 &&
          password.confirmPassword.length > 0 &&
          password.confirmPassword.length < 6 &&
          password.newPassword.length < 6 && (
            <div className={styles.PasswordMissMatch}>
              비밀번호는 6자리 이상 입력해주세요.
            </div>
          )}
        <Button
          buttonType={isValidateButton ? 'Active' : 'Disabled'}
          className={styles.EditButton}
          onClick={handleUpdatePassword}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default MyPage;
