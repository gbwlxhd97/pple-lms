import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { stringify } from 'qs';

/**
 *
 * example :router.push('/home', { key: 'value' }, { someState: 'stateValue' });
 * @returns
 */
export function useRouter() {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      back(steps = 1) {
        navigate(-steps);
      },
      push(path: RoutePath, search?: any, state?: any) {
        navigate(
          {
            pathname: path,
            search: search ? stringify(search, { indices: false }) : undefined,
          },
          { state }
        );
      },
    };
  }, [navigate]);
}

export type RoutePath =
  | '/login'
  | '/sign-up'
  | '/main'
  | '/attendance'
  | '/waiting'
  | '/inquiry-complete'
  | `/course/${string}`
  | `/course/reference/${string}`
  | '/mypage'
  | `/course/${string}/notice/detail/${string}`
  | `/course/${string}/notice`
  | `/course/${string}/statistics`
  | `/course/${string}/statistics/detail/${string}`;
