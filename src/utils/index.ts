/**
 * example
 * onKeyDown={(e) => handleKeyDown(e,handleClick)}
 * @param {*} e event
 * @param {*} actionFunction
 */
export const handleKeyDown = (
  e: React.KeyboardEvent,
  actionFunction: () => void
) => {
  if (e.key === 'Enter') {
    // 엔터 키를 눌렀을 때 함수 호출
    actionFunction();
  }
};
