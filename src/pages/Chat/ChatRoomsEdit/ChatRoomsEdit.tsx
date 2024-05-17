import React from 'react';
import { IChatItem } from '../types';
import ArrowLeftTailIcon from '@/icons/icon/ArrowLeftTail';

import styles from './ChatRoomsEdit.module.scss';
import Button from '@/components/common/Button/Button';
import ChatItemBase from '../ChatRooms/ChatItemBase';

type ChatRoomsEditProps = {
  setIsEdit: React.Dispatch<boolean>;
  chatData: IChatItem[];
};

const ChatRoomsEdit = ({ setIsEdit, chatData }: ChatRoomsEditProps) => {
  return (
    <div className={styles.ChatRoomsEditWrapper}>
      <div className={styles.ChatRoomsEditContainer}>
        <div className={styles.ChatRoomsEditHeader}>
          <ArrowLeftTailIcon
            onClick={() => setIsEdit(false)}
            width={24}
            height={24}
            className={styles.BackIcon}
          />
          <div className={styles.ChatRoomsEditTitle}> 편집 </div>
          <div className={styles.ChatRoomsEditSubTitle}>전체 선택</div>
        </div>
        <div className={styles.ChatRoomsEditContent}>
          {chatData.map((chatInfo: IChatItem, idx) => (
            <ChatItemBase key={`${chatInfo.roomId}-chatRoomsEdit`}>
              <ChatItemBase.EditButton isActive={idx % 2 === 0} />
              <ChatItemBase.ChatItemContent chatInfo={chatInfo} />
            </ChatItemBase>
          ))}
        </div>
      </div>
      <Button buttonType="Spacing" className={styles.DeleteButton}>
        삭제 2
      </Button>
    </div>
  );
};

export default ChatRoomsEdit;
