import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea/TextArea';
import Title from '@/components/common/Title/Title';

const SurveyEditPage = () => {
  return (
    <>
      <Title title="설문 만들기" />
      <Input placeholder="제목을 입력해주세요" label="설문 제목" type="text" />
      <Select placeholder="마감일을 선택해주세요" options={['2024-03-04']} label='마감일'  />
      <TextArea label="설명" />
      <div className="Space"></div>
    </>
  );
}

export default SurveyEditPage;