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
    if (location.pathname === '/system/autoprovision') return 'autoprovision';
    if (location.pathname === '/system/firmware') return 'firmware';
    if (location.pathname === '/system/blockedlist') return 'blockedlist';
    return 'manufacturer';
  };

  const onTabChange = key => {
    history.push(`/system/${key}`);
  };

  return (
    <>
      {(location.pathname === '/system/manufacturer' ||
        location.pathname === '/system/firmware' ||
        location.pathname === '/system/autoprovision' ||
        location.pathname === '/system/blockedlist') && (
        <Container>
          <Tabs defaultActiveKey={getActiveKey()} onChange={onTabChange}>
            <TabPane tab="Device Manufacturer" key="manufacturer" />
            <TabPane tab="Firmware" key="firmware" />
            <TabPane tab="Auto-Provisioning" key="autoprovision" />
            <TabPane tab="Client Blocked List" key="blockedlist" />
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
