import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

import ThemeContext from 'contexts/ThemeContext';
import Navbar from 'components/Navbar';

import styles from './index.module.scss';

const { Content, Footer } = Layout;

const AppLayout = ({
  children,
  menuItems,
  mobileMenuItems,
  onLogout,
  totalAlarms,
  rightMenuItem,
  currentUserId,
  Link,
}) => {
  const theme = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');

  const currentYear = new Date().getFullYear();

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 768 && screenSize !== 'sm') {
      setIsCollapsed(true);
      setIsMobile(true);
      setScreenSize('sm');
    } else if (width >= 768 && width < 992 && screenSize !== 'md') {
      setIsCollapsed(true);
      setIsMobile(false);
      setScreenSize('md');
    } else if (width >= 992 && screenSize !== 'lg') {
      setIsCollapsed(false);
      setIsMobile(false);
      setScreenSize('lg');
    }
  };

  const handleMenuToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => onLogout();

  const handleMenuItemClick = e => {
    if (isMobile === true) {
      setIsCollapsed(true);

      if (e.key === 'logout') {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  return (
    <Layout className={`${isCollapsed ? styles.collapsed : ''} ${isMobile ? styles.mobile : ''}`}>
      <Navbar
        menuItems={menuItems}
        mobileMenuItems={mobileMenuItems}
        collapsed={isCollapsed}
        isMobile={isMobile}
        onLogout={handleLogout}
        onMenuToggle={handleMenuToggle}
        onMenuItemClick={handleMenuItemClick}
        totalAlarms={totalAlarms}
        rightMenuItem={rightMenuItem}
        currentUserId={currentUserId}
        Link={Link}
      />
      <Content className={styles.Content}>{children}</Content>
      <Footer className={styles.Footer}>
        Copyright © {currentYear} {theme.company} Inc. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired,
  menuItems: PropTypes.instanceOf(Array),
  mobileMenuItems: PropTypes.instanceOf(Array),
  totalAlarms: PropTypes.number,
  rightMenuItem: PropTypes.node,
  currentUserId: PropTypes.number,
  Link: PropTypes.func,
};

AppLayout.defaultProps = {
  menuItems: [],
  mobileMenuItems: null,
  totalAlarms: null,
  rightMenuItem: null,
  currentUserId: 0,
  Link: RouterLink,
};

export default AppLayout;
