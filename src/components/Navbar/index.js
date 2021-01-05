import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Drawer, Badge } from 'antd';
import { MenuOutlined, BellFilled, BellOutlined } from '@ant-design/icons';

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
  totalAlarms,
  rightMenuItem,
}) => {
  const { company, logo, logoMobile, routes } = useContext(ThemeContext);
  const location = useLocation();

  const selectedKeys = locationState.pathname.split('/');

  const renderRightMenuIcon = () => {
    if (isMobile) {
      return <MenuOutlined className={styles.MenuIcon} onClick={onMenuToggle} />;
    }
    return rightMenuItem || <SettingsDropdown onLogout={onLogout} />;
  };

  return (
    <Header className={`${styles.Navbar}`}>
      <Link className={styles.LogoContainer} to={routes.root}>
        <img
          src={`${isMobile ? logoMobile : logo}`}
          alt={company}
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
          <Link className={styles.LogoContainer} to={routes.root}>
            <img src={logo} alt={company} width="200" />
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
        <Link to={routes.alarms}>
          <Badge count={totalAlarms} showZero>
            {location.pathname === routes.alarms ? (
              <BellFilled className={styles.BellIconActive} />
            ) : (
              <BellOutlined className={styles.BellIcon} />
            )}
          </Badge>
        </Link>
        {renderRightMenuIcon()}
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
  totalAlarms: PropTypes.number,
  rightMenuItem: PropTypes.node,
};

Navbar.defaultProps = {
  menuItems: [],
  mobileMenuItems: null,
  onMenuItemClick: () => {},
  onLogout: () => {},
  totalAlarms: 0,
  rightMenuItem: null,
};

export default Navbar;
