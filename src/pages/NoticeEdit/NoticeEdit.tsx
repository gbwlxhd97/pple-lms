import styles from './NoticeEdit.module.scss';
import Title from '@/components/common/Title/Title';
import Input from '@/components/common/Input/Input';
import TextArea from '@/components/common/TextArea/TextArea';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import { INotice } from '@/interfaces/notice';

const NoticeEditPage = () => {
  const [noticeEdit, setNoticeEdit] = useState<INotice>({
    title: '',
    contents: '',
    sendMessage: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoticeEdit((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoticeEdit((prev) => ({
      ...prev,
      contents: e.target.value,
    }));
  };

  const isValidateButton =
    noticeEdit.title.length > 0 && noticeEdit.contents.length > 0;

  return (
    <>
      <div className={styles.EditContainer}>
        <Title title="새 공지사항 작성" />
        <Input
          label="제목"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
        />
        <TextArea
          label="내용"
          placeholder="내용을 입력하세요"
          name="contents"
          onChange={handleContentsChange}
        />
        <div className={styles.FlexCheckBoxWrap}>
          <CheckBox
            className={styles.CheckBox}
            checkBoxType={
              noticeEdit.sendMessage === 'STUDENT' ? 'Active' : 'Default'
            }
            onClick={() => {
              setNoticeEdit((prev) => ({
                ...prev,
                sendMessage: 'STUDENT',
              }));
            }}
          >
            학생에게 문자 보내기
          </CheckBox>
          <CheckBox
            className={styles.CheckBox}
            checkBoxType={
              noticeEdit.sendMessage === 'PARENTS' ? 'Active' : 'Default'
            }
            onClick={() => {
              setNoticeEdit((prev) => ({
                ...prev,
                sendMessage: 'PARENTS',
              }));
            }}
          >
            부모님에게 문자 보내기
          </CheckBox>
        </div>
        <Button
          buttonType={isValidateButton ? 'Active' : 'Disabled'}
          className={styles.EditButton}
        >
          게시하기
        </Button>
      </div>
    </>
  );
};

export default NoticeEditPage;
