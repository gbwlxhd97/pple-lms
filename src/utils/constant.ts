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
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    zIndex: '1000',
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
