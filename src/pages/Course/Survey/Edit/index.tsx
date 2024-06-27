import React, { useState, useEffect, ChangeEvent } from 'react';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import Input from '@/components/common/Input/Input';
import OptionInput from '@/components/common/OptionInput';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea/TextArea';
import Title from '@/components/common/Title/Title';
import { endDate } from '@/utils/date';
import toast from 'react-hot-toast';
import styles from './index.module.scss';
import { TrashIcon } from '@/icons/icon';
import { questionTypeList } from '@/utils/constant';
import { useParams } from 'react-router';
import surveyAPIList from '@/services/survey';
import SingleCheckBox from '@/components/common/SingleCheckBox';
import { useRouter } from '@/hooks/useRouter';

const SurveyEditPage: React.FC = () => {
  const { courseId } = useParams();
  const router = useRouter()
  const [questions, setQuestions] = useState([
    {
      id: 1,
      num: 1,
      text: '',
      questionType: '',
      choices: [
        {
          id: 1,
          num: 1,
          text: '',
        },
      ],
    },
  ]);
  const [endValues, setEndValues] = useState('');
  const [surveyInfo, setSurveyInfo] = useState({
    title: '',
    description: '',
    endAt: endValues,
    anonymous: true,
    questions: questions,
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    setSurveyInfo((prevSurveyInfo) => ({
      ...prevSurveyInfo,
      questions: questions,
    }));
  }, [questions]);

  useEffect(() => {
    setSurveyInfo((prevSurveyInfo) => ({
      ...prevSurveyInfo,
      endAt: endValues,
    }));
  }, [endValues]);

  useEffect(() => {
    validateForm();
  }, [questions, surveyInfo.title, surveyInfo.description, endValues]);

  const validateForm = () => {
    if (
      surveyInfo.title.trim().length > 0 &&
      surveyInfo.description.trim().length > 0 &&
      endValues.trim().length > 0 &&
      questions.every(
        (question) =>
          question.questionType === 'SHORT_ANSWER' ||
          (question.text.trim().length > 0 &&
            question.choices.every((choice) => choice.text.trim().length > 0))
      )
    ) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  };

  // 새로운 질문을 추가하는 함수
  const addQuestion = () => {
    const newQuestion: any = {
      id: questions.length + 1,
      num: questions.length + 1,
      text: '',
      questionType: '',
      choices: [
        {
          id: 0,
          num: 1,
          text: '',
        },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const addOption = (questionId: number) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === questionId) {
          const newChoiceId = question.choices.length + 1;
          const newChoice = {
            id: newChoiceId,
            num: newChoiceId,
            text: '',
          };
          return {
            ...question,
            choices: [...question.choices, newChoice],
          };
        }
        return question;
      });
    });
  };

  const deleteOption = (questionId: number, choiceId: number) => {
    if (choiceId === 1) {
      toast.error('최소 옵션은 한 개 이상 있어야합니다.');
      return;
    }
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            choices: question.choices.filter(
              (choice) => choice.id !== choiceId
            ),
          };
        }
        return question;
      });
    });
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
    if (questionId === 1) {
      toast.error('최소 질문은 한 개 이상 있어야합니다.');
      return;
    }
    const newQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (id: number, value: string) => {
    const valueType = value === '주관식' ? 'SHORT_ANSWER' : 'SINGLE_CHOICE';
    const newQuestions = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          questionType: valueType,
          choices: valueType === 'SHORT_ANSWER' ? [] : question.choices,
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setSurveyInfo((prevSurveyInfo) => ({
      ...prevSurveyInfo,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await surveyAPIList.registerSurvey(
        Number(courseId),
        surveyInfo
      );
      console.log(res);
      if(res) {
        toast.success("등록이 완료되었습니다.")
        router.push(`/course/${courseId}/survey`)
      }
    } catch (error) {
      
    }
  };

  const handleAnonymous = (isAnonymous: boolean) => {
    setSurveyInfo((prev) => ({
      ...prev,
      anonymous: isAnonymous,
    }));
  }

  return (
    <>
      <Title title="설문 만들기" />
      <Input
        placeholder="제목을 입력해주세요"
        label="설문 제목"
        type="text"
        value={surveyInfo.title}
        name="title"
        onChange={handleChange}
      />
      <Select
        placeholder="마감일을 선택해주세요"
        options={endDate()}
        label="마감일"
        values={endValues}
        setValues={setEndValues}
      />
      <TextArea
        label="설명"
        value={surveyInfo.description}
        name="description"
        onChange={handleChange}
      />
      <div className="Space"></div>
      {questions.map((question, idx) => (
        <div key={question.id}>
          <div className={styles.Flex}>
            <div>질문 {idx + 1}</div>
            {/* <div> */}
            <TrashIcon
              className={styles.RightValue}
              width={24}
              height={24}
              onClick={() => handleQuestionDelete(question.id)}
            />
            {/* </div> */}
          </div>
          <Select
            placeholder="객관식"
            options={questionTypeList}
            values={
              question.questionType === 'SHORT_ANSWER'
                ? '주관식'
                : question.questionType === 'SINGLE_CHOICE'
                  ? '객관식'
                  : ''
            }
            setValues={(value: any) => {
              handleQuestionTypeChange(question.id, value);
            }}
          />
          <Input
            placeholder="질문을 입력해주세요"
            type="text"
            name="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(question.id, e)}
          />
          {/* <CheckBox checkBoxType="Active">복수응답</CheckBox> */}
          {question.questionType === 'SINGLE_CHOICE' &&
            question.choices.map((choice, index) => (
              <OptionInput
                placeholder={`옵션${index + 1}`}
                onClickDelete={() => {
                  deleteOption(question.id, choice.id);
                }}
                onChange={(e) => handleChoiceChange(question.id, choice.id, e)}
                name="text"
                value={choice.text}
              />
            ))}
          {question.questionType === 'SINGLE_CHOICE' && (
            <div
              className={styles.AddOptionText}
              onClick={() => {
                addOption(question.id);
              }}
            >
              + 옵션 추가
            </div>
          )}
        </div>
      ))}
      <Button
        buttonType="Abled"
        onClick={addQuestion}
        className={styles.AddButton}
      >
        질문 추가
      </Button>
      <div className="Space"></div>
      <div className={styles.FlexAnonymous}>
        <SingleCheckBox
          checkBoxType={surveyInfo.anonymous ? 'Active' : 'Default'}
          onClick={() => {
            handleAnonymous(true);
          }}
        >
          익명으로 받기
        </SingleCheckBox>
        <SingleCheckBox
          checkBoxType={surveyInfo.anonymous ? 'Default' : 'Active'}
          onClick={() => {
            handleAnonymous(false);
          }}
        >
          실명으로 받기
        </SingleCheckBox>
      </div>
      <Button
        buttonType={isSubmitEnabled ? 'Active' : 'Disabled'}
        className={styles.SubmitButton}
        onClick={handleSubmit}
      >
        완료
      </Button>
    </>
  );
};

export default SurveyEditPage;
