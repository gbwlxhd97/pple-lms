import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './Aside.module.scss';

import HomeIcon from '@/icons/icon/HomeIcon';
import HamburgerIcon from '@/icons/icon/HamburgerIcon';
import CloseIcon from '@/icons/icon/CloseIcon';
import UserIcon from '@/icons/icon/UserIcon';
import LogoutIcon from '@/icons/icon/LogoutIcon';

const ASidebar = () => {
  const [toggle, setToggle] = useState(false);

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Sidebar
          rootStyles={{
            top: 0,
            right: 0,
            height: '100vh',
            position: 'absolute',
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
                <div>이름</div>
              </div>
              <div className={styles.GapFlex}>
                <div className={styles.NeighborFlex}>
                  <div>로그아웃</div>
                  <div>
                    <LogoutIcon width={18} height={18} />
                  </div>
                </div>
                <div className={styles.NeighborFlex}>
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
                <li>
                  <span>메인페이지</span> <HomeIcon width={18} height={18} />
                </li>
                <li>
                  <span>출석</span> <HomeIcon width={18} height={18} />
                </li>
              </ul>
            </div>
          </Menu>
        </Sidebar>
      </div>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </>
  );
};

export default ASidebar;
