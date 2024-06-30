import styles from './NoticeEdit.module.scss';
import Title from '@/components/common/Title/Title';
import Input from '@/components/common/Input/Input';
import TextArea from '@/components/common/TextArea/TextArea';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { INotice } from '@/interfaces/notice';
import SingleCheckBox from '@/components/common/SingleCheckBox';
import useProfileStore from '@/stores/useProfileStore';
import { useRouter } from '@/hooks/useRouter';
import toast from 'react-hot-toast';
import noticeAPIList from '@/services/notice';

const NoticeEditPage = () => {
  const [noticeEdit, setNoticeEdit] = useState<INotice>({
    title: '',
    main: '',
    sendType: '',
  });

  const {
    profile: { role },
  } = useProfileStore();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoticeEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePost = async () => {
    try {
      const requestBody = {
        title: noticeEdit.title,
        main: noticeEdit.main,
        toStudent: noticeEdit.sendType === 'STUDENT',
        toParent: noticeEdit.sendType === 'PARENTS',
      };

      const response = await noticeAPIList.insertNotice(requestBody);
      if (response) {
        toast.success('등록이 완료되었습니다.');
        router.back(1);
      }
    } catch (error) {
      toast.error('등록에 실패했습니다.');
      console.error(error);
    }
  };

  const isValidateButton =
    noticeEdit.title.length > 0 && noticeEdit.main.length > 0;

  /**
     * && 아래 주석은 학생, 부모님 유효성검사를 제외한다.
    // (noticeEdit.sendType === 'STUDENT' || noticeEdit.sendType === 'PARENTS');
     * 
     */
  useEffect(() => {
    if (role !== 'TEACHER') {
      toast.error('권한이 없습니다.');
      router.push('/main');
    }
  }, []);

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
          name="main"
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
          onClick={handlePost}
        >
          게시하기
        </Button>
      </div>
    </>
  );
};

export default NoticeEditPage;
