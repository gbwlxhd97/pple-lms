import React, { useCallback, useState } from 'react';
import styles from './RootLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import HomeIcon from '@/icons/icon/HomeIcon';
import HamburgerIcon from '@/icons/icon/HamburgerIcon';
import CloseIcon from '@/icons/icon/CloseIcon';
import UserIcon from '@/icons/icon/UserIcon';
import LogoutIcon from '@/icons/icon/LogoutIcon';
import ASidebar from '../Aside/Aside';
import useProfileStore from '@/stores/useProfileStore';
import useCourseNameStore from '@/stores/useCourseName';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {title} = useCourseNameStore()
  const { pathname } = useLocation();
  const isNotLoginPage = pathname !== '/login' && pathname !== '/sign-up';
  const headerTitle = pathname === '/sign-up' ? '회원가입' : title;

  return (
    <div className={styles.RootLayout}>
      {pathname === '/sign-up' && (
        <>
          <div className={styles.HeaderTitle}>{headerTitle}</div>
          <div className={styles.DividerWrap}>
            <div className={'Divider Reservation'} />
          </div>
        </>
      )}
      {pathname !== '/login' && pathname !== '/sign-up' && (
        <>
          <ASidebar>
            {(pathname.startsWith('/course') ||
              pathname.startsWith('/attendance')) && (
              <div className={styles.WithAsideTitle}>{headerTitle}</div>
            )}
          </ASidebar>
          <div className={'Divider Title'} />
        </>
      )}
      <div className={styles.Content}>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
