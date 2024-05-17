import React, { useCallback, useState } from 'react';
import styles from './RootLayout.module.scss';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAsideBar = useCallback(() => {
    setIsOpen(!isOpen);
  },[isOpen]);

  return (
    <div className={styles.RootLayout}>
      <button className={styles.Hamburger} onClick={toggleAsideBar}>
        &#9776;
      </button>
      <div className={`${styles.AsideContainer} ${isOpen ? styles.open : ''}`}>
        <aside className={styles.AsideBar}>
          <h2>Aside Bar</h2>
          <p>Some content...</p>
        </aside>
        <div className={`${styles.Overlay} ${isOpen ? styles.open : ''}`} onClick={toggleAsideBar}></div>
      </div>
      <div className={styles.Content}>
        <Outlet />
        <h1>Welcome to My App</h1>
        <p>This is a mobile-like centered content.</p>
      </div>
    </div>
  );
};

export default RootLayout;
