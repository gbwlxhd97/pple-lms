import { useState, ChangeEvent, useEffect } from 'react';
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
import { FileIcon } from '@/icons/icon';
import DeleteIcon from '@/icons/icon/DeleteIcon';

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

  const handleFileChange = (files: FileList) => {
    setInfo((prevState) => ({
      ...prevState,
      files: [...prevState.files, ...Array.from(files)],
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      info.files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('title', info.title);
      formData.append('main', info.main);

      const response = await courseAPIList.insertNote(formData);
      if (response) {
        toast.success('등록이 완료되었습니다.');
        router.back(1);
      }
    } catch (error) {
      toast.error('등록에 실패했습니다.');
      console.error(error);
    }
  };

  const handleFileRemove = (index: number) => {
    setInfo((prevState) => ({
      ...prevState,
      files: prevState.files.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (role !== 'TEACHER') {
      toast.error('권한이 없습니다.');
      router.push('/main');
    }
  }, []);

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF'];

  const validation = info.title?.length > 0 && info.main.length > 0;
  return (
    <div className="SpacingWrapper">
      <Title title="강의 자료 업로드" />
      <Input
        type="text"
        name="title"
        onChange={handleInputChange}
        placeholder="제목"
      />
      <TextArea name="main" onChange={handleInputChange} placeholder="내용" />
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
                <div className={styles.FileWrap}>
                  <div className={styles.Flex}>
                    <div>
                      <FileIcon width={24} height={24} />{' '}
                    </div>
                    <div>{file.name}</div>
                  </div>
                  <div
                    className={styles.DeleteButton}
                    onClick={() => {
                      handleFileRemove(index);
                    }}
                  >
                    <DeleteIcon width={18} height={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        buttonType={validation ? 'Active' : 'Disabled'}
        className={styles.UploadButton}
        onClick={handleSubmit}
      >
        업로드
      </Button>
    </div>
  );
};

export default CourseReferenceEditPage;
