import Input from '@/components/common/Input/Input';
import TextArea from '@/components/common/TextArea/TextArea';
import Title from '@/components/common/Title/Title'
import useProfileStore from '@/stores/useProfileStore';
import { FileUploader } from 'react-drag-drop-files';
import styles from './index.module.scss'
import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import courseAPIList from '@/services/course';
import toast from 'react-hot-toast';
import { useRouter } from '@/hooks/useRouter';
const CourseReferenceEditPage = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const [file, setFile] = useState<any>(null);

  const handleChange = (file:any) => {
    setFile(file);
  };
  const router = useRouter()
  const handleSumbmit = async () => {
    try {
      const payload = {
        title: 'test2',
        main: 'test333',
      };
      const res = await courseAPIList.insertNote(payload);
      console.log(res);
      if(res) {
        toast.success("등록이 완료되었습니다.")
        router.back(1)
      }
    } catch (error) {
      
    }
  }

  const fileTypes = ['JPEG', 'PNG', 'GIF'];
  return (
    <div className="SpacingWrapper">
      <Title title="강의 자료 업로드" />
      <Input type="text" />
      <TextArea />
      <div className={styles.FileUploaderContainer}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          classes={styles.CustomUploader}
          hoverTitle=" "
        >
          <div className={styles.CustomMessage}>
            <p>파일을 여기로 드래그하거나 클릭하여 업로드하세요.</p>
          </div>
        </FileUploader>
        {file && (
          <div className="preview">
            <p>업로드된 파일: {file.name}</p>
          </div>
        )}
      </div>
      <Button
        buttonType="Active"
        className={styles.UploadButton}
        onClick={handleSumbmit}
      >
        업로드
      </Button>
    </div>
  );
}

export default CourseReferenceEditPage