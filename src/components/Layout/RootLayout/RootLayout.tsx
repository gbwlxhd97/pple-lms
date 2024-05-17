import React, { useCallback, useState } from 'react';
import styles from './RootLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';

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
            <div>홈버튼</div>
            {isOpen ? (
              <button className={styles.Hamburger} onClick={toggleAsideBar}>
                x
              </button>
            ) : (
              <button className={styles.Hamburger} onClick={toggleAsideBar}>
                &#9776;
              </button>
            )}
          </div>
          <div
            className={`${styles.AsideContainer} ${isOpen ? styles.open : ''}`}
          >
            <aside className={styles.AsideBar}>
              <h2>Aside Bar</h2>
              <p>Some content...</p>
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
