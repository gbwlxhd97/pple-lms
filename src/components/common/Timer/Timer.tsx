// src/Timer.tsx
import React, { useState, useEffect, memo, useRef } from 'react';
import styles from './Timer.module.scss';
import { durationFormatTime } from '@/utils/date';
import memberAPIList from '@/services/member';
import Button from '../Button/Button';

type TimerProps = {
  duration: number; // in seconds
  onComplete: () => void;
  isComplete: boolean;
};

const Timer = ({ duration, onComplete, isComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [authCode, setAuthCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
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
        onComplete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.TimerContainer}>
      <div className={styles.LabelWrap}>인증번호</div>
      <div className={styles.Flex}>
        <input
          type="text"
          className={styles.WrapInput}
          placeholder="인증번호를 입력해주세요"
          onChange={(e) => {
            setAuthCode(e.target.value);
          }}
          ref={inputRef}
        />
        <Button
          className={styles.WrapButton}
          buttonType={authCode?.length > 0 ? 'Certification' : 'Disabled'}
          onClick={handleClickCheckAuthCode}
        >
          {isComplete ? '인증완료' : '인증하기'}
        </Button>
      </div>
      <div className={styles.LeftedTime}>
        인증번호를 입력해주세요 {durationFormatTime(timeLeft)}
      </div>
    </div>
  );
};

export default memo(Timer);
