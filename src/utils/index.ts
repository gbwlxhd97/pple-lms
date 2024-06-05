import toast from 'react-hot-toast';

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


export const loadingToast = () => {
  toast.loading('준비중인 기능입니다.');
};

export const downloadFile = async (url: string, fileName?: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });

    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName || url.split('/').pop() || 'download';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl); // 메모리 해제
  } catch (error) {
    console.error('파일 다운로드에 실패했습니다.', error);
  }
};