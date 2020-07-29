import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';

const { TabPane } = Tabs;

const System = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  const getActiveKey = () => {
    if (location.pathname === '/system/autoprovision') return 'system/autoprovision';
    if (location.pathname === '/system/firmware') return '/system/firmware';
    if (location.pathname === '/system/blockedlist') return '/system/blockedlist';
    return '/system/manufacturer';
  };

  const onTabChange = value => {
    history.push(value);
  };

  return (
    <>
      {(location.pathname === '/system/manufacturer' ||
        location.pathname === '/system/firmware' ||
        location.pathname === '/system/autoprovision' ||
        location.pathname === '/system/blockedlist') && (
        <Container>
          <Tabs defaultActiveKey={getActiveKey()} onChange={onTabChange}>
            <TabPane tab="Device Manufacturer" key="/system/manufacturer" />
            <TabPane tab="Firmware" key="/system/firmware" />
            <TabPane tab="Auto-Provisioning" key="/system/autoprovision" />
            <TabPane tab="Client Blocked List" key="/system/blockedlist" />
          </Tabs>
        </Container>
      )}
      {children}
    </>
  );
};

System.propTypes = {
  children: PropTypes.node.isRequired,
};

export default System;
