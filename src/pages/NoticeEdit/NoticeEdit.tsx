import styles from './NoticeEdit.module.scss';
import Title from '@/components/common/Title/Title';
import Input from '@/components/common/Input/Input';
import TextArea from '@/components/common/TextArea/TextArea';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import { INotice } from '@/interfaces/notice';
import SingleCheckBox from '@/components/common/SingleCheckBox';

const NoticeEditPage = () => {
  const [noticeEdit, setNoticeEdit] = useState<INotice>({
    title: '',
    content: '',
    sendType: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoticeEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidateButton =
    noticeEdit.title.length > 0 &&
    noticeEdit.content.length > 0 &&
    (noticeEdit.sendType === 'STUDENT' || noticeEdit.sendType === 'PARENTS');

  return (
    <>
      <div className={styles.EditContainer}>
        <Title title="새 공지사항 작성" />
        <Input
          label="제목"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleChange}
        />
        <TextArea
          label="내용"
          placeholder="내용을 입력하세요"
          name="content"
          onChange={handleChange}
        />
        <div className={styles.FlexCheckBoxWrap}>
          <SingleCheckBox
            className={styles.CheckBox}
            checkBoxType={
              noticeEdit.sendType === 'STUDENT' ? 'Active' : 'Default'
            }
            onClick={() => {
              setNoticeEdit((prev) => ({
                ...prev,
                sendType: 'STUDENT',
              }));
            }}
          >
            학생에게 문자 보내기
          </SingleCheckBox>
          <SingleCheckBox
            className={styles.CheckBox}
            checkBoxType={
              noticeEdit.sendType === 'PARENTS' ? 'Active' : 'Default'
            }
            onClick={() => {
              setNoticeEdit((prev) => ({
                ...prev,
                sendType: 'PARENTS',
              }));
            }}
          >
            부모님에게 문자 보내기
          </SingleCheckBox>
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
