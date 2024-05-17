import React, { useState } from 'react';
import { IChatItem } from '../types';
import styles from './ChatRooms.module.scss';
import EditIcon from '@/icons/icon/EditIcon';
import ChatRoomsEdit from '../ChatRoomsEdit/ChatRoomsEdit';
import { useNavigate } from 'react-router';
import ChatItemBase from './ChatItemBase';

const ChatRooms = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditIcon = () => {
    setIsEdit((prev) => !prev);
  };

  const mockChatData = [
    {
      imgSrc:
        'https://i.namu.wiki/i/Qvk18CBALY3A7CKoYdienLC1B8q8JXEZIiydvuxxVFFqGYjDmDOaY2vB0YX_P_WbxA5REh9NtAdhi5L1TLEx1A.webp',
      roomId: '1a2',
      storeName: '개신남 10호점',
      lastDate: '2024-03-31',
      recentChat: '아하 네 알겠습니다 ㅎㅎ',
      unViewedMsgCount: 2,
    },
    {
      imgSrc:
        'https://i.namu.wiki/i/Qvk18CBALY3A7CKoYdienLC1B8q8JXEZIiydvuxxVFFqGYjDmDOaY2vB0YX_P_WbxA5REh9NtAdhi5L1TLEx1A.webp',
      roomId: '1a3',
      storeName: '개신남 10호점',
      lastDate: '2024-03-31',
      recentChat: '아하 네 알겠습니다 ㅎㅎ',
      unViewedMsgCount: 2,
    },
    {
      imgSrc:
        'https://i.namu.wiki/i/Qvk18CBALY3A7CKoYdienLC1B8q8JXEZIiydvuxxVFFqGYjDmDOaY2vB0YX_P_WbxA5REh9NtAdhi5L1TLEx1A.webp',
      roomId: '1a4',
      storeName: '개신남 10호점',
      lastDate: '2024-03-31',
      recentChat: '아하 네 알겠습니다 ㅎㅎ',
      unViewedMsgCount: 2,
    },
  ];

  const navigate = useNavigate();

  const onClickRoute = (roomId: string, storeName: string) => {
    navigate(`${roomId}`, { state: { roomId, storeName } });
  };

  return (
    <>
      {isEdit ? (
        <ChatRoomsEdit chatData={mockChatData} setIsEdit={setIsEdit} />
      ) : (
        <div className={styles.ChatRoomsWrapper}>
          <div className={styles.ChatRoomsHeader}>
            <div>채팅</div>
            <EditIcon
              className={styles.EditIcon}
              width={24}
              height={24}
              onClick={handleEditIcon}
            />
          </div>
          {mockChatData.map((chatInfo: IChatItem) => (
            <ChatItemBase key={chatInfo.roomId}>
              <ChatItemBase.ChatItemContent
                onClick={() =>
                  onClickRoute(chatInfo.roomId, chatInfo.storeName)
                }
                chatInfo={chatInfo}
              />
              <ChatItemBase.UnViewCount
                unViewedMsgCount={chatInfo.unViewedMsgCount}
              />
            </ChatItemBase>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatRooms;
