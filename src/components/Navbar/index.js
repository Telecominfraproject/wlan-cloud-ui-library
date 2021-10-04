import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Layout, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import SettingsDropdown from 'components/SettingsDropdown';
import ThemeContext from 'contexts/ThemeContext';

import Menu from './components/Menu';
import Alarm from './components/Alarm';

import styles from './index.module.scss';

const { Header } = Layout;

const Navbar = ({
  menuItems,
  mobileMenuItems,
  collapsed,
  isMobile,
  onMenuToggle,
  onMenuItemClick,
  onLogout,
  totalAlarms,
  rightMenuItem,
  currentUserId,
  Link,
}) => {
  const { company, logo, logoMobile, routes } = useContext(ThemeContext);

  const renderRightMenuIcon = () => {
    if (isMobile) {
      return <MenuOutlined className={styles.MenuIcon} onClick={onMenuToggle} />;
    }
    return rightMenuItem || <SettingsDropdown onLogout={onLogout} currentUserId={currentUserId} />;
  };

  return (
    <Header className={`${styles.Navbar}`}>
      <RouterLink className={styles.LogoContainer} to={routes.root}>
        {isMobile ? <img src={logoMobile} alt={company} width="32" /> : <>{logo}</>}
      </RouterLink>
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
          <Link className={styles.LogoContainer} to={routes.root}>
            <img src={logo} alt={company} width="200" />
          </Link>
          <Menu
            mode="inline"
            menuItems={mobileMenuItems || menuItems}
            onMenuItemClick={onMenuItemClick}
          />
        </Drawer>
      ) : (
        <Menu menuItems={menuItems} onMenuItemClick={onMenuItemClick} Link={Link} />
      )}
      <div className={styles.RightMenu}>
        {totalAlarms !== null && <Alarm routes={routes} totalAlarms={totalAlarms} />}
        {renderRightMenuIcon()}
      </div>
    </Header>
  );
};

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  menuItems: PropTypes.instanceOf(Array),
  mobileMenuItems: PropTypes.instanceOf(Array),
  onMenuItemClick: PropTypes.func,
  onLogout: PropTypes.func,
  totalAlarms: PropTypes.number,
  rightMenuItem: PropTypes.node,
  currentUserId: PropTypes.number,
  Link: PropTypes.func,
};

Navbar.defaultProps = {
  menuItems: [],
  mobileMenuItems: null,
  onMenuItemClick: () => {},
  onLogout: () => {},
  totalAlarms: null,
  rightMenuItem: null,
  currentUserId: 0,
  Link: RouterLink,
};

export default Navbar;
