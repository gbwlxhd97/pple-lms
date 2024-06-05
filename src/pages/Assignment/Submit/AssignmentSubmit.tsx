import { useState, ChangeEvent } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import { useRouter } from '@/hooks/useRouter';
import TextArea from '@/components/common/TextArea/TextArea';
import Title from '@/components/common/Title/Title';
import Button from '@/components/common/Button/Button';
import useProfileStore from '@/stores/useProfileStore';
import courseAPIList from '@/services/course';
import styles from './AssignmentSubmit.module.scss';
import { Link } from 'react-router-dom';

interface IinsertBody {
  main: string;
  files: File[];
}

const AssignmentSubmitPage: React.FC = () => {
  const {
    profile: { role },
  } = useProfileStore();
  const [info, setInfo] = useState<IinsertBody>({
    main: '',
    files: [],
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const fileTypes = ['JPEG', 'PNG', 'GIF'];

  const validation = info.main.length > 0;

  return (
    <div className="SpacingWrapper">
      <Title title="과제제출" />
      <TextArea
        name="main"
        onChange={handleInputChange}
        placeholder="내용을 입력해주세요"
      />
      <div className={styles.FileUploaderContainer}>
        <FileUploader
          handleChange={handleFileChange}
          name="files"
          types={fileTypes}
          hoverTitle=" "
          multiple={true}
        >
          <Button buttonType="File">+ Choose File</Button>
        </FileUploader>
        {info.files.length > 0 && (
          <div className={styles.PreviewContainer}>
            {info.files.map((file, index) => (
              <div key={index} className={styles.PreviewItem}>
                <p>업로드된 파일: {file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        buttonType={validation ? 'Active' : 'Disabled'}
        className={styles.SubmitButton}
        onClick={handleSubmit}
      >
        제출
      </Button>
      <div className={styles.Buttoncontainer}>
        <Link to="/assignment">
          <Button buttonType="List" className={styles.ListButton}>
            목록
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentSubmitPage;
