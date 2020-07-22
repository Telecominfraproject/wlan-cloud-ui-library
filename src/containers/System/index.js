import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';

const { TabPane } = Tabs;

const System = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {(location.pathname === '/system/manufacturer' ||
        location.pathname === '/system/firmware') && (
        <Container>
          <Tabs
            defaultActiveKey={
              location.pathname === '/system/manufacturer' ? 'manufacturer' : 'firmware'
            }
          >
            <TabPane
              tab={<Link to="/system/manufacturer">Device Manufacturer</Link>}
              key="manufacturer"
            />
            <TabPane tab={<Link to="/system/firmware">Firmware</Link>} key="firmware" />
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
