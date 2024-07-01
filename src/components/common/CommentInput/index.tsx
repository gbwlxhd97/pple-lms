import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import commentAPIList from '@/services/comment';
import { ArrowRightIcon } from '@/icons/icon';
import useOutsideClick from '@/hooks/useOutsideClick';
import toast from 'react-hot-toast';

type CommentInputProps = {
  memberId: string;
  fetchComments: any;
};

const CommentInput = ({ memberId, fetchComments }: CommentInputProps) => {
  const [selectedRound, setSelectedRound] = useState('1차시');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [comment, setComment] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rounds = Array.from({ length: 16 }, (_, i) => `${i + 1}차시`);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectRound = (round: string) => {
    setSelectedRound(round);
    setIsDropdownOpen(false);
  };

  const handleSumbmit = async () => {
    const courseSectionId = parseInt(selectedRound);

    try {
      const payload = {
        courseSectionId: courseSectionId,
        memberId: Number(memberId),
        main: comment,
      };
      const res = await commentAPIList.insertComment(payload);
      console.log(res);
      if (res.status === 200) {
        toast.success('코맨트 작성완료!')
        fetchComments();
        setSelectedRound('1차시');
        setComment('');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useOutsideClick(dropdownRef, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftSection} onClick={toggleDropdown}>
        <span className={styles.round}>{selectedRound}</span>
        <span
          className={`${styles.arrowDown} ${isDropdownOpen ? styles.ArrowUp : ''} `}
        >
          <ArrowRightIcon width={12} height={12} stroke="#7879F1" />
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            {rounds.map((round) => (
              <div
                key={round}
                className={styles.dropdownItem}
                onClick={() => selectRound(round)}
              >
                {round}
              </div>
            ))}
          </div>
        )}
      </div>
        <textarea
          className={styles.textarea}
          placeholder="코멘트를 입력해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      <button className={styles.sendButton} onClick={handleSumbmit}>
        <span className={styles.arrowUp}>↑</span>
      </button>
    </div>
  );
};

export default CommentInput;
