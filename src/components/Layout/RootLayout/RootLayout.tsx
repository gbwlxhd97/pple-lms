import React, { useCallback, useState } from 'react';
import styles from './RootLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import HomeIcon from '@/icons/icon/HomeIcon';
import HamburgerIcon from '@/icons/icon/HamburgerIcon';
import CloseIcon from '@/icons/icon/CloseIcon';
import UserIcon from '@/icons/icon/UserIcon';
import LogoutIcon from '@/icons/icon/LogoutIcon';
import ASidebar from '../Aside/Aside';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAsideBar = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const { pathname } = useLocation();

  const isNotLoginPage = pathname !== '/login' && pathname !== '/sign-up';
  const headerTitle = pathname === '/sign-up' ? '회원가입' : '과목명';

  return (
    <div className={styles.RootLayout}>
      {pathname === '/sign-up' && (
        <>
          <div className={styles.HeaderTitle}>{headerTitle}</div>
          <div className={'Divider Reservation'} />
        </>
      )}
      {pathname !== '/login' && pathname !== '/sign-up' && (
        <>
          <ASidebar>
            <div className={styles.WithAsideTitle}>{headerTitle}</div>
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
