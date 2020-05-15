import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import ThemeContext from 'contexts/ThemeContext';
import SettingsDropdown from 'components/SettingsDropdown';
import styles from './index.module.scss';

const { Header } = Layout;

const GlobalHeader = ({ collapsed, onMenuButtonClick, isMobile }) => {
  const theme = useContext(ThemeContext);
  return (
    <Header
      className={`${styles.GlobalHeader} ${collapsed ? styles.collapsed : ''} ${
        isMobile ? styles.mobile : ''
      }`}
    >
      {isMobile && [
        <Link className={styles.LogoContainer} to="/" key="mobileLogo">
          <img src={theme.logoMobile} alt={theme.company} width="32" />
        </Link>,
      ]}
      {collapsed ? (
        <MenuUnfoldOutlined className={styles.MenuIcon} onClick={onMenuButtonClick} />
      ) : (
        <MenuFoldOutlined className={styles.MenuIcon} onClick={onMenuButtonClick} />
      )}
      <div className={styles.RightMenu}>
        <SettingsDropdown />
      </div>
    </Header>
  );
};

GlobalHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onMenuButtonClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default GlobalHeader;
