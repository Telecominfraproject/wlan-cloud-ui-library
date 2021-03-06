import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import ThemeContext from 'contexts/ThemeContext';
import styles from './index.module.scss';

const SettingsDropdown = ({ onLogout, currentUserId }) => {
  const { routes } = useContext(ThemeContext);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const handleVisibleChange = visible => {
    setPopoverVisible(visible);
  };

  const userOptions = (
    <>
      {currentUserId !== 0 && (
        <Row>
          <Link onClick={hidePopover} to={routes.account}>
            Edit User
          </Link>
        </Row>
      )}
      <Row>
        <Link onClick={onLogout} to={routes.root}>
          Log Out
        </Link>
      </Row>
    </>
  );

  return (
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
  );
};

SettingsDropdown.propTypes = {
  onLogout: PropTypes.func,
  currentUserId: PropTypes.number,
};

SettingsDropdown.defaultProps = {
  onLogout: () => {},
  currentUserId: 0,
};

export default SettingsDropdown;
