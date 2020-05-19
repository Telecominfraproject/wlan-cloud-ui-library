import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const SettingsDropdown = ({ onLogout }) => {
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
        <Link onClick={hidePopover} to="/account/edit">
          Edit Account
        </Link>
      </Row>
      <Row>
        <Link onClick={onLogout} to="/">
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
};

SettingsDropdown.defaultProps = {
  onLogout: () => {},
};

export default SettingsDropdown;
