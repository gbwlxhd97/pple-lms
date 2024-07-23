import React, { ReactNode, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './Aside.module.scss';

import HomeIcon from '@/icons/icon/HomeIcon';
import HamburgerIcon from '@/icons/icon/HamburgerIcon';
import CloseIcon from '@/icons/icon/CloseIcon';
import UserIcon from '@/icons/icon/UserIcon';
import LogoutIcon from '@/icons/icon/LogoutIcon';
import { RoutePath, useRouter } from '@/hooks/useRouter';
import authAPIList from '@/services/auth';
import { loadingToast } from '@/utils';
import useProfileStore from '@/stores/useProfileStore';
import Cookies from 'js-cookie';
import { SESSION_KEY } from '@/utils/constant';
import { CheckAttendanceIcon, ClassRegistIcon, NoticeIcon, ReferenceIcon, SurveyIcon, WhiteHomeIcon } from '@/icons/icon';
import { useParams } from 'react-router';

type AsideProps = {
  children?: ReactNode;
};

const ASidebar = ({ children }: AsideProps) => {
  const [toggle, setToggle] = useState(false);
  const {courseId} = useParams()
  const paramId = useParams()
  
  const {
    profile: { name,role },
  } = useProfileStore();
  const toggleSidebar = () => {
    setToggle(!toggle);
  };
  const { clear } = useProfileStore();
  const router = useRouter();

  const routeThenCloseAside = (route: RoutePath | any) => {
    router.push(route);
    setToggle(false);
  };

  const logout = async () => {
    try {
      const res = await authAPIList.logout();
      if (res.status === 200) {
        clear();
        Cookies.remove(SESSION_KEY);
        routeThenCloseAside('/login');
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        style={{
          position: 'sticky',
          top: 0,
          right: 0,
          zIndex: 999999,
        }}
      >
        <Sidebar
          rootStyles={{
            top: 0,
            right: 0,
            height: '100vh',
            position: 'sticky',
          }}
          toggled={toggle}
          onBackdropClick={() => setToggle(false)}
          backgroundColor="#393939"
          breakPoint="all"
          rtl
        >
          <Menu>
            <div className={styles.UserInfoWrapper}>
              <div className={styles.InfoBetweenFlex}>
                <CloseIcon width={18} height={18} onClick={toggleSidebar} />
                <div>{name}님</div>
              </div>
              <div className={styles.GapFlex}>
                <div className={styles.NeighborFlex} onClick={logout}>
                  <div>로그아웃</div>
                  <div>
                    <LogoutIcon width={18} height={18} />
                  </div>
                </div>
                <div
                  className={styles.NeighborFlex}
                  onClick={() => {
                    routeThenCloseAside('/mypage');
                  }}
                >
                  <div>마이페이지</div>
                  <div>
                    <UserIcon width={18} height={18} />
                  </div>
                </div>
              </div>
            </div>
            <div className="Divider Aside" />
            <div className={styles.MenuInfo}>
              <ul className={styles.SemiNeighborFlex}>
                <li
                  onClick={() => {
                    routeThenCloseAside('/main');
                  }}
                >
                  <span>메인페이지</span>{' '}
                  <WhiteHomeIcon width={18} height={18} />
                </li>
                {courseId && (
                  <li
                    onClick={() => {
                      routeThenCloseAside(`/course/${courseId}/notice`);
                    }}
                  >
                    <span>공지사항</span> <NoticeIcon width={18} height={18} />
                  </li>
                )}
                {courseId && (
                  <li
                    onClick={() => {
                      routeThenCloseAside(`/attendance/${courseId}`);
                    }}
                  >
                    <span>출석</span> <CheckAttendanceIcon width={18} height={18} />
                  </li>
                )}
                {courseId && (
                  <li
                    onClick={() => {
                      routeThenCloseAside(`/course/${courseId}/survey`);
                    }}
                  >
                    <span>설문</span> <SurveyIcon width={18} height={18} />
                  </li>
                )}
                {courseId && (
                  <li
                    onClick={() => {
                      routeThenCloseAside(`/course/reference/${courseId}`);
                    }}
                  >
                    <span>강의자료</span>{' '}
                    <ReferenceIcon width={18} height={18} />
                  </li>
                )}
                {courseId && role === 'TEACHER' && (
                  <li
                    onClick={() => {
                      routeThenCloseAside(`/course/${courseId}/class-regist`);
                    }}
                  >
                    <span>학생 수강신청</span>{' '}
                    <ClassRegistIcon width={18} height={18} />
                  </li>
                )}
                {courseId && role === 'TEACHER' && (
                  <li
                    onClick={() => {
                      routeThenCloseAside(`/course/${courseId}/growth/1`);
                    }}
                  >
                    <span>학생 성장기록부</span>{' '}
                    <ClassRegistIcon width={18} height={18} />
                  </li>
                )}
              </ul>
            </div>
          </Menu>
        </Sidebar>
      </div>
      <div className={styles.TitleBetweenFlex}>
        <HomeIcon
          width={18}
          height={18}
          onClick={() => {
            routeThenCloseAside('/main');
          }}
        />
        {children}
        <HamburgerIcon width={28} height={28} onClick={toggleSidebar} />
      </div>
    </>
  );
};

export default ASidebar;
