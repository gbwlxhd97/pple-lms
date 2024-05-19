import React, { useCallback, useState } from 'react';
import styles from './RootLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import HomeIcon from '@/icons/icon/HomeIcon';
import HamburgerIcon from '@/icons/icon/HamburgerIcon';
import CloseIcon from '@/icons/icon/CloseIcon';
import UserIcon from '@/icons/icon/UserIcon';
import LogoutIcon from '@/icons/icon/LogoutIcon';

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
      {isNotLoginPage && (
        <>
          <div className={styles.HeaderWrap}>
            <div>
              <HomeIcon width={24} height={24} />
            </div>
            {isOpen ? (
              <button className={styles.Hamburger} onClick={toggleAsideBar}>
                <CloseIcon width={18} height={18} />
              </button>
            ) : (
              <button className={styles.Hamburger} onClick={toggleAsideBar}>
                <HamburgerIcon width={42} height={42} />
              </button>
            )}
          </div>
          <div
            className={`${styles.AsideContainer} ${isOpen ? styles.open : ''}`}
          >
            <aside className={styles.AsideBar}>
              <h2>Aside Bar</h2>
              <p>Some content...</p>
              <UserIcon width={24} height={24} />
              <LogoutIcon width={24} height={24} />
            </aside>
            <div
              className={`${styles.Overlay} ${isOpen ? styles.open : ''}`}
              onClick={toggleAsideBar}
            ></div>
          </div>
        </>
      )}
      {pathname !== '/login' && (
        <>
          <div className={styles.HeaderTitle}>{headerTitle}</div>
          <div className={'Divider Reservation'} />
        </>
      )}
      <div className={styles.Content}>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
