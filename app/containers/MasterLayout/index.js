import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import GlobalHeader from 'components/GlobalHeader';
import SideMenu from 'components/SideMenu';

import styles from './MasterLayout.module.scss';

const { Content, Footer } = Layout;

const MasterLayout = ({ children, logo, logoMobile, locationState, onLogout }) => {
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

  const handleMenuItemClick = () => {
    if (isMobile === true) {
      setIsCollapsed(true);
    }
  };

  const handleLogout = () => {
    onLogout();
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
    <Layout>
      <SideMenu
        locationState={locationState}
        collapsed={isCollapsed}
        isMobile={isMobile}
        logo={logo}
        logoMobile={logoMobile}
        onMenuButtonClick={handleMenuToggle}
        onMenuItemClick={handleMenuItemClick}
        onLogout={handleLogout}
      />
      <Layout
        className={`${styles.MainLayout} ${isCollapsed ? styles.collapsed : ''} ${
          isMobile ? styles.mobile : ''
        }`}
      >
        <GlobalHeader
          collapsed={isCollapsed}
          isMobile={isMobile}
          logoMobile={logoMobile}
          onMenuButtonClick={handleMenuToggle}
        />
        <Content className={styles.Content}>{children}</Content>
        <Footer className={styles.Footer}>
          Copyright © {currentYear} ConnectUs Inc. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.node.isRequired,
  logo: PropTypes.string.isRequired,
  logoMobile: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  locationState: PropTypes.instanceOf(Object).isRequired,
};

export default MasterLayout;
