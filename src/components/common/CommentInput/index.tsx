import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import commentAPIList from '@/services/comment';
import { ArrowRightIcon } from '@/icons/icon';
import useOutsideClick from '@/hooks/useOutsideClick';
import toast from 'react-hot-toast';

type CommentInputProps = {
  memberId: string;
  fetchComments: any;
  options: Array<any>;
};
/**
 * 학생 통계 디테일 페이지에서 코맨트를 남기는 인풋
 * @param param0 
 * @returns 
 */
const CommentInput = ({
  memberId,
  fetchComments,
  options,
}: CommentInputProps) => {
  const [selectedCourseSectionId, setSelectedCourseSectionId] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [comment, setComment] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

   const selectRound = (courseSectionId: number) => {
     setSelectedCourseSectionId(courseSectionId);
     setIsDropdownOpen(false);
   };

  const handleSumbmit = async () => {
    const courseSectionId = selectedCourseSectionId;

    try {
      const payload = {
        courseSectionId: courseSectionId,
        memberId: Number(memberId),
        main: comment,
      };
      const res = await commentAPIList.insertComment(payload);
      console.log(res);
      if (res.status === 200) {
        toast.success('코맨트 작성완료!');
        fetchComments();
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
        <span className={styles.round}>{selectedCourseSectionId}차시</span>
        <span
          className={`${styles.arrowDown} ${isDropdownOpen ? styles.ArrowUp : ''} `}
        >
          <ArrowRightIcon width={12} height={12} stroke="#7879F1" />
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            {options.map((round) => (
              <div
                key={round}
                className={styles.dropdownItem}
                onClick={() => selectRound(round.id)}
              >
                {round.name}
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
