import React from 'react';
import styles from './ChatRoom.module.scss';
import CameraIcon from '@/icons/icon/CameraIcon';
import PlusIcon from '@/icons/icon/PlusIcon';
import ArrowLeftTailIcon from '@/icons/icon/ArrowLeftTail';
import DotsVerticalIcon from '@/icons/icon/DotsVertical';
import { useNavigate } from 'react-router';

const ChatRoom = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.ChatRoomHeader}>
        <ArrowLeftTailIcon
          onClick={() => navigate('/chat-list')}
          width={24}
          height={24}
        />
        <div className={styles.ChatRoomTitle}> 개신남 10호점 </div>
        <DotsVerticalIcon width={24} height={24} />
      </div>
      <div className={styles.ChatRoomWrapper}>
        <div className={`${styles.ChatWrapper} ${styles.Sender}`}>
          <div className={styles.ChatContainer}>
            <div className={styles.ChatContent}>
              <div className={styles.Date}>오후 8:08</div>
              <div className={`${styles.Chat} ${styles.Sender}`}>
                앗 네! 감사합니다.
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.ChatWrapper} ${styles.Receiver}`}>
          <img
            src="https://i.namu.wiki/i/Qvk18CBALY3A7CKoYdienLC1B8q8JXEZIiydvuxxVFFqGYjDmDOaY2vB0YX_P_WbxA5REh9NtAdhi5L1TLEx1A.webp"
            className={styles.ChatImage}
          />
          <div className={styles.ChatContainer}>
            <div className={styles.ChatContent}>
              <div className={`${styles.Chat} ${styles.Receiver}`}>
                아하 네 알겠습니다. ㅎㅎ
              </div>
              <div className={styles.Date}>오후 8:08</div>
            </div>
            <div className={styles.ChatContent}>
              <div className={`${styles.Chat} ${styles.Receiver}`}>
                아하 네 알겠습니다. ㅎㅎ
              </div>
              <div className={styles.Date}>오후 8:08</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ChatInputWrapper}>
        <PlusIcon className={styles.PlusIcon} width={24} height={24} />
        <div className={styles.ChatInputContent}>
          <textarea
            rows={1}
            className={styles.ChatInput}
            placeholder="메시지를 입력하세요"
          />
          <CameraIcon className={styles.CameraIcon} width={20} height={20} />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
