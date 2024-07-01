import React, { useState } from 'react';
import styles from './index.module.scss';
import commentAPIList from '@/services/comment';

type CommentInputProps = {
  memberId: string;
  fetchComments: any;
};

const CommentInput = ({ memberId, fetchComments }: CommentInputProps) => {
  const [selectedRound, setSelectedRound] = useState('1차시');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [comment, setComment] = useState('');

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
        fetchComments();
        setComment('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection} onClick={toggleDropdown}>
        <span className={styles.round}>{selectedRound}</span>
        <span className={styles.arrowDown}>▼</span>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
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
