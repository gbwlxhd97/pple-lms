import { useState, ChangeEvent } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import { useRouter } from '@/hooks/useRouter';
import Input from '@/components/common/Input/Input';
import TextArea from '@/components/common/TextArea/TextArea';
import Title from '@/components/common/Title/Title';
import Button from '@/components/common/Button/Button';
import useProfileStore from '@/stores/useProfileStore';
import courseAPIList from '@/services/course';
import styles from './index.module.scss';

interface IinsertBody {
  title: string;
  main: string;
  files: File[];
}

const CourseReferenceEditPage: React.FC = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const [info, setInfo] = useState<IinsertBody>({
    title: '',
    main: '',
    files: [],
  });

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File) => {
    setInfo((prevState) => ({
      ...prevState,
      files: [...prevState.files, file],
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      if (info.files.length > 0) {
        for (let i = 0; i < info.files.length; i++) {
          formData.append('files', info.files[i]);
        }
      }
      const payload ={
        title: info.title,
        main: info.main,
        files: info.files.length > 0 ? formData : []
      }
      const response = await courseAPIList.insertNote(payload);

      if (response) {
        toast.success('등록이 완료되었습니다.');
        router.back(1);
      }
    } catch (error) {
      toast.error('등록에 실패했습니다.');
      console.error(error);
    }
  };

  const fileTypes = ['JPEG', 'PNG', 'GIF'];

  console.log(info);
  
  return (
    <div className="SpacingWrapper">
      <Title title="강의 자료 업로드" />
      <Input
        type="text"
        name="title"
        onChange={handleInputChange}
        placeholder="Title"
      />
      <TextArea
        name="main"
        onChange={handleInputChange}
        placeholder="Main Content"
      />
      <div className={styles.FileUploaderContainer}>
        <FileUploader
          handleChange={handleFileChange}
          name="files"
          types={fileTypes}
          classes={styles.CustomUploader}
          hoverTitle=" "
          multiple={true}
        >
          <div className={styles.CustomMessage}>
            <p>파일을 여기로 드래그하거나 클릭하여 업로드하세요.</p>
          </div>
        </FileUploader>
        {info.files.length > 0 && (
          <div className={styles.PreviewContainer}>
            {info.files.map((file, index) => (
              <div key={index} className={styles.PreviewItem}>
                <p>업로드된 파일: {file?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        buttonType="Active"
        className={styles.UploadButton}
        onClick={handleSubmit}
      >
        업로드
      </Button>
    </div>
  );
};

export default CourseReferenceEditPage;
