import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import Container from 'components/Container';
import ThemeContext from 'contexts/ThemeContext';

const { TabPane } = Tabs;

const System = ({ hasCustomer, children, showsFirmware }) => {
  const { routes } = useContext(ThemeContext);
  const location = useLocation();
  const history = useHistory();

  const getActiveKey = () => {
    if (location.pathname === routes.autoprovision) return 'autoprovision';
    if (location.pathname === routes.firmware) return 'firmware';
    if (location.pathname === routes.blockedlist) return 'blockedlist';
    return 'manufacturer';
  };

  const onTabChange = key => {
    history.push(`${routes.system}/${key}`);
  };

  return (
    <Container>
      <Tabs defaultActiveKey={getActiveKey()} onChange={onTabChange}>
        <TabPane tab="Device Manufacturer" key="manufacturer" />
        {hasCustomer && (
          <>
            {showsFirmware && <TabPane tab="Firmware" key="firmware" />}
            <TabPane tab="Auto-Provisioning" key="autoprovision" />
            <TabPane tab="Client Blocked List" key="blockedlist" />
          </>
        )}
      </Tabs>
      {children}
    </Container>
  );
};

System.propTypes = {
  hasCustomer: PropTypes.bool,
  children: PropTypes.node.isRequired,
  showsFirmware: PropTypes.bool,
};

System.defaultProps = {
  hasCustomer: true,
  showsFirmware: true,
};

export default System;
