import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Popover, Row } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from '@ant-design/icons';

import ThemeContext from 'contexts/ThemeContext';
import styles from './index.module.scss';

const { Header } = Layout;

const GlobalHeader = ({ collapsed, onMenuButtonClick, isMobile }) => {
  const theme = useContext(ThemeContext);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const handleVisibleChange = visible => {
    setPopoverVisible(visible);
  };

  const userOptions = (
    <>
      <Row>
        <Link onClick={hidePopover} to="/accounts/customers/view">
          Profile
        </Link>
      </Row>
      <Row>
        <Link onClick={hidePopover} to="/account/edit">
          Edit Profile
        </Link>
      </Row>
      <Row>
        <Link onClick={hidePopover} to="/account">
          Users
        </Link>
      </Row>
      <Row>
        <Link onClick={hidePopover} to="/accounts">
          Advanced
        </Link>
      </Row>
      <Row>
        <Link onClick={hidePopover} to="/accounts/customersxw">
          Rules Preference
        </Link>
      </Row>
    </>
  );

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
        <Popover
          content={userOptions}
          trigger="click"
          getPopupContainer={e => e.parentElement}
          visible={popoverVisible}
          onVisibleChange={handleVisibleChange}
          placement="bottomRight"
          arrowPointAtCenter
        >
          <SettingOutlined className={styles.MenuIcon} />
        </Popover>
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
