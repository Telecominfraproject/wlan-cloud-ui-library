import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';

const { TabPane } = Tabs;

const System = ({ children }) => {
  const location = useLocation();

  const setActiveKey = () => {
    if (location.pathname === '/system/autoprovision') return 'autoprovision';
    if (location.pathname === '/system/firmware') return 'firmware';
    if (location.pathname === '/system/blockedlist') return 'blockedlist';
    return 'manufacturer';
  };
  return (
    <>
      {(location.pathname === '/system/manufacturer' ||
        location.pathname === '/system/firmware' ||
        location.pathname === '/system/autoprovision' ||
        location.pathname === '/system/blockedlist') && (
        <Container>
          <Tabs defaultActiveKey={setActiveKey()}>
            <TabPane
              tab={<Link to="/system/manufacturer">Device Manufacturer</Link>}
              key="manufacturer"
            />
            <TabPane tab={<Link to="/system/firmware">Firmware</Link>} key="firmware" />
            <TabPane
              tab={<Link to="/system/autoprovision">Auto-Provisioning</Link>}
              key="autoprovision"
            />
            <TabPane
              tab={<Link to="/system/blockedlist">Client Blocked List</Link>}
              key="blockedlist"
            />
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
