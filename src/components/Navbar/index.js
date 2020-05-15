import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import SettingsDropdown from 'components/SettingsDropdown';
import ThemeContext from 'contexts/ThemeContext';
import Menu from './components/Menu';
import styles from './index.module.scss';

const { Header } = Layout;

const Navbar = ({
  menuItems,
  mobileMenuItems,
  locationState,
  collapsed,
  isMobile,
  onMenuToggle,
  onMenuItemClick,
  onLogout,
}) => {
  const theme = useContext(ThemeContext);

  const selectedKeys = [];
  menuItems.forEach(item => {
    if (locationState.pathname.startsWith(item.path)) {
      selectedKeys.push(item.key.toString());
    }
  });

  return (
    <Header className={`${styles.Navbar}`}>
      <Link className={styles.LogoContainer} to="/">
        <img
          src={`${isMobile ? theme.logoMobile : theme.logo}`}
          alt={theme.company}
          width={`${isMobile ? '32' : '200'}`}
        />
      </Link>
      {isMobile ? (
        <Drawer
          zIndex={9999}
          placement="left"
          closable={false}
          visible={!collapsed}
          onClose={onMenuToggle}
          bodyStyle={{ padding: 0 }}
          width={256}
        >
          <Link className={styles.LogoContainer} to="/">
            <img src={theme.logo} alt={theme.company} width="200" />
          </Link>
          <Menu
            mode="inline"
            menuItems={mobileMenuItems || menuItems}
            selectedKeys={selectedKeys}
            onMenuItemClick={onMenuItemClick}
          />
        </Drawer>
      ) : (
        <Menu menuItems={menuItems} selectedKeys={selectedKeys} onMenuItemClick={onMenuItemClick} />
      )}
      <div className={styles.RightMenu}>
        {isMobile ? (
          <MenuOutlined className={styles.MenuIcon} onClick={onMenuToggle} />
        ) : (
          <SettingsDropdown onLogout={onLogout} />
        )}
      </div>
    </Header>
  );
};

Navbar.propTypes = {
  locationState: PropTypes.instanceOf(Object).isRequired,
  collapsed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  menuItems: PropTypes.instanceOf(Array),
  mobileMenuItems: PropTypes.instanceOf(Array),
  onMenuItemClick: PropTypes.func,
  onLogout: PropTypes.func,
};

Navbar.defaultProps = {
  menuItems: [],
  mobileMenuItems: null,
  onMenuItemClick: () => {},
  onLogout: () => {},
};

export default Navbar;
