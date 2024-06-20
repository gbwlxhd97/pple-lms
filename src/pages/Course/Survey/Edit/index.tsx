import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import Input from '@/components/common/Input/Input';
import OptionInput from '@/components/common/OptionInput';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea/TextArea';
import Title from '@/components/common/Title/Title';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SurveyEditPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      num: 0,
      text: '',
      questionType: 'MULTIPLE_CHOICE',
      choices: [
        {
          id: 0,
          num: 0,
          text: '',
        },
      ],
    },
  ]);

  // 새로운 질문을 추가하는 함수
  const addQuestion = () => {
    const newQuestion = {
      id: questions.length,
      num: questions.length,
      text: '',
      questionType: 'MULTIPLE_CHOICE',
      choices: [
        {
          id: 0,
          num: 0,
          text: '',
        },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (id: number, event: any) => {
    const newQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, [event.target.name]: event.target.value };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (
    questionId: number,
    choiceId: number,
    event: any
  ) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const newChoices = question.choices.map((choice) => {
          if (choice.id === choiceId) {
            return { ...choice, [event.target.name]: event.target.value };
          }
          return choice;
        });
        return { ...question, choices: newChoices };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleQuestionDelete = (questionId: number) => {
    if(questionId === 0) {
      toast.error("최소 질문은 한 개 이상 있어야합니다.")
      return
    }
    const newQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    setQuestions(newQuestions);
  };

  return (
    <>
      <Title title="설문 만들기" />
      <Input placeholder="제목을 입력해주세요" label="설문 제목" type="text" />
      <Select
        placeholder="마감일을 선택해주세요"
        options={['2024-03-04']}
        label="마감일"
      />
      <TextArea label="설명" />
      <div className="Space"></div>
      {questions.map((question) => (
        <div key={question.id}>
          <div>
            <div>질문</div>
            <div onClick={() => handleQuestionDelete(question.id)}>삭제</div>
          </div>
          <Select placeholder="객관식" options={['객관식']} />
          <Input
            placeholder="질문을 입력해주세요"
            type="text"
            name="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(question.id, e)}
          />
          <CheckBox checkBoxType="Active">복수응답</CheckBox>
          <OptionInput />
        </div>
      ))}
      <Button buttonType="Abled">질문 추가</Button>
      <div className="Space"></div>
    </>
  );
};

export default SurveyEditPage;
