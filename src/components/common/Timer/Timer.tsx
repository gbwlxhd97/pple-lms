// src/Timer.tsx
import React, { useState, useEffect, memo, useRef } from 'react';
import styles from './Timer.module.scss';
import { durationFormatTime } from '@/utils/date';
import memberAPIList from '@/services/member';
import Button from '../Button/Button';

type TimerProps = {
  duration: number; // in seconds
  onComplete?: any;
  isComplete?: boolean;
  isSignUp?: boolean;
};

const Timer = ({ duration, onComplete, isComplete, isSignUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [authCode, setAuthCode] = useState('');
  const [authCodeStatus, setAuthCodeStatus] = useState<
    'ING' | 'ERROR' | 'SUCCESS'
  >('ING');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, isComplete]);
  useEffect(() => {
    if (timeLeft <= 0 || isComplete) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClickCheckAuthCode = async () => {
    // string으로 선언된 authCode를 number로 마지막에 치환합니다.
    try {
      const payload = {
        authCode: Number(authCode),
      };
      const res = await memberAPIList.memberIdentityCodeCheck(payload);
      console.log(res);
      if (res) {
        setAuthCodeStatus('SUCCESS');
        onComplete(true);
      } else {
        setAuthCodeStatus('ERROR');
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isComplete, '인증번호ㄱ성공');

  return (
    <>
      {/* 회원가입에서 타이머 */}
      {isSignUp && (
        <div className={styles.TimerContainer}>
          <div className={styles.LabelWrap}>인증번호</div>
          <div className={styles.Flex}>
            <input
              className={`${styles.WrapInput} ${authCodeStatus}`}
              placeholder="인증번호를 입력해주세요"
              onChange={(e) => {
                setAuthCode(e.target.value);
              }}
              autoComplete="one-time-code"
              ref={inputRef}
              disabled={isComplete}
              type="text"
            />
            <Button
              className={styles.WrapButton}
              buttonType={
                isComplete
                  ? 'Disabled'
                  : authCode?.length > 0
                    ? 'Certification'
                    : 'Disabled'
              }
              onClick={handleClickCheckAuthCode}
            >
              {isComplete ? '인증완료' : '인증하기'}
            </Button>
          </div>
          <div className={`${styles.LeftedTime} ${styles[authCodeStatus]}`}>
            {authCodeStatus === 'SUCCESS'
              ? '인증이 완료되었습니다'
              : authCodeStatus === 'ING'
                ? `인증번호를 입력해주세요 ${durationFormatTime(timeLeft)}`
                : `인증번호가 일치하지 않습니다 ${durationFormatTime(timeLeft)}`}
          </div>
        </div>
      )}
      {!isSignUp && (
        <div className={`${styles.LeftedTime} ${styles.AttendCode}`}>
          {durationFormatTime(timeLeft)}
        </div>
      )}
    </>
  );
};

export default Timer;
