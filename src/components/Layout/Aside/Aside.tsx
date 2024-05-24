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
          <Menu
            rootStyles={{
              [`.${styles.container}`]: {
                backgroundColor: 'red',
              },
            }}
          >
            <MenuItem className={styles.custom}>Menu 1</MenuItem>
            <MenuItem className="custom-menu-item">Menu 2</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </>
  );
};

export default ASidebar;
