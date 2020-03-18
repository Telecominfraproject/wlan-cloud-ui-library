import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Drawer } from 'antd';
import {
  DashboardOutlined,
  ProfileOutlined,
AreaChartOutlined,
  MobileOutlined,
  ApiOutlined,
  NotificationOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import styles from './Sider.module.scss';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const ACCOUNTS = 'accounts';
const NETWORK = 'network';
const CONFIGURATION = 'configuration';
const INSIGHTS = 'insights';
const SYSTEM = 'system';
const HISTORY = 'history';
const rootSubmenuKeys = [ACCOUNTS, NETWORK, CONFIGURATION, INSIGHTS, SYSTEM, HISTORY];

const SideMenu = ({
  locationState,
  collapsed,
  isMobile,
  logo,
  logoMobile,
  onMenuButtonClick,
  onMenuItemClick,
  onLogout,
}) => {
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    setOpenKeys([]);
  }, [collapsed]);

  const enocMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined className={styles.MenuIcon} />,
      path: '/',
      text: 'Dashboard',
      onClick: onMenuItemClick,
    },
    {
      key: 'profiles',
      icon: <ProfileOutlined className={styles.MenuIcon} />,
      path: '/profiles',
      text: 'Profiles',
      onClick: onMenuItemClick,
    },
    {
      key: 'reports',
      icon: <AreaChartOutlined className={styles.MenuIcon} />,
      path: '/analytics/qoe',
      text: 'Insights',
      onClick: onMenuItemClick,
    },
    {
      key: 'client-devices',
      icon: <MobileOutlined className={styles.MenuIcon} />,
      path: '/network/client-devices',
      text: 'Client Devices',
      onClick: onMenuItemClick,
    },
    {
      key: 'network-elements',
      icon: <ApiOutlined className={styles.MenuIcon} />,
      path: '/network/elements',
      text: 'Network Elements',
      onClick: onMenuItemClick,
    },
    {
      key: 'alarms',
      icon: <NotificationOutlined className={styles.MenuIcon} />,
      path: '/network/alarms',
      text: 'Alarms',
      onClick: onMenuItemClick,
    },
    {
      key: 'recommendations',
      icon: <CheckCircleOutlined className={styles.MenuIcon} />,
      path: '/recommendations',
      text: 'Recommendations',
      onClick: onMenuItemClick,
    },
    {
      key: 'settings',
      icon: <SettingOutlined className={styles.MenuIcon} />,
      path: '/settings',
      text: 'Settings',
      onClick: onMenuItemClick,
    },
    {
      key: ACCOUNTS,
      icon: <TeamOutlined className={styles.MenuIcon} />,
      text: 'Customers',
      path: '/accounts/customers',
      onClick: onMenuItemClick,
    },
  ];

  const commonMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined className={styles.MenuIcon} />,
      path: '/signout',
      text: 'Sign Out',
      onClick: onLogout,
    },
  ];

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const getMenu = (config = { items: [] }, defaultSelectedKeys = []) => {
    const items = [];

    let keys = [];
    let selectedKeys = [...defaultSelectedKeys];

    config.items.forEach(item => {
      if (item && item.key) {
        if (item.children) {
          const subMenu = getMenu({ items: item.children, parent: item });

          if (subMenu.selectedKeys && subMenu.selectedKeys.length) {
            selectedKeys = [...selectedKeys, ...subMenu.selectedKeys];
          }
          if (subMenu.openKeys && subMenu.openKeys.length) {
            keys = [...keys, ...subMenu.openKeys];
          }

          items.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  {item.icon}
                  <span>{item.text}</span>
                </span>
              }
            >
              {subMenu.items}
            </SubMenu>
          );
        } else {
          const ItemComponent = item.Component || Item;

          let LinkComponent = ({ ...restP }) => (
            <Link
              // preserveParams={this.getPreservedParams(item.path, locationState)}
              {...restP}
            />
          );

          if (item.LinkComponent) {
            LinkComponent = item.LinkComponent;
          }

          const path = locationState.pathname;
          const pathAndHash = `${path}${locationState.hash}`; // for hash routing

          if (path.startsWith(item.path) || pathAndHash.startsWith(item.path)) {
            if (config.parent) {
              keys.push(config.parent.key);
            }
            selectedKeys.push(item.key.toString());
          }

          items.push(
            <ItemComponent key={item.key} className="ant-menu-item">
              <LinkComponent onClick={item.onClick} to={item.path}>
                {item.icon}
                <span>{item.text}</span>
              </LinkComponent>
            </ItemComponent>
          );
        }
      }
    });

    return {
      items,
      selectedKeys,
      keys,
    };
  };

  const menuConfig = {
    items: [...enocMenuItems, ...commonMenuItems],
  };

  const menu = getMenu(menuConfig);

  const sider = (
    <Sider
      collapsed={isMobile ? false : collapsed}
      width="234px"
      collapsedWidth="80px"
      breakpoint="lg"
      className={`${styles.Sider} ${collapsed ? styles.collapsed : ''}  ${
        isMobile ? styles.Mobile : ''
      }`}
    >
      <div className={styles.TopArea}>
        <Link className={styles.LogoContainer} to="/">
          <img className={styles.Logo} alt="ConnectUs" src={collapsed ? logoMobile : logo} />
        </Link>
      </div>
      <Menu
        className="sidemenu"
        selectedKeys={menu.selectedKeys}
        defaultOpenKeys={menu.openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        theme="dark"
      >
        {menu.items}
      </Menu>
    </Sider>
  );

  if (isMobile) {
    return (
      <Drawer
        zIndex={9999}
        placement="left"
        closable={false}
        visible={!collapsed}
        onClose={onMenuButtonClick}
        bodyStyle={{ padding: 0 }}
        width={256}
      >
        {sider}
      </Drawer>
    );
  }

  return sider;
};

SideMenu.propTypes = {
  locationState: PropTypes.instanceOf(Object).isRequired,
  collapsed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
  logoMobile: PropTypes.string.isRequired,
  onMenuButtonClick: PropTypes.func.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SideMenu;
