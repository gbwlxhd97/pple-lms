export const SESSION_KEY = 'sessionKey';

export const questionTypeList = [
  {
    label: '객관식',
    type: 'SINGLE_CHOICE',
  },
  {
    label: '주관식',
    type: 'SHORT_ANSWER',
  },
];

export const customStyles: any = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    zIndex: '1000',
    maxHeight: '80vh', // 최대 높이를 설정합니다.
    width: '80vw', // 최대 너비를 설정합니다.
    overflow: 'auto', // 내용이 넘칠 경우 스크롤을 추가합니다.
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '999',
  },
};
