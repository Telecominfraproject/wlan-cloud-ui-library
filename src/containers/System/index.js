import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';

const { TabPane } = Tabs;

const System = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {(location.pathname === '/system/manufacturer' ||
        location.pathname === '/system/firmware') && (
        <Container>
          <Tabs>
            <TabPane
              tab={<Link to="/system/manufacturer">Device Manufacturer</Link>}
              key="manufacturer"
            />
            <TabPane tab={<Link to="/system/firmware">Firmware</Link>} key="firmware" />
          </Tabs>
        </Container>
      )}
      {children}
    </div>
  );
};

System.propTypes = {
  children: PropTypes.node.isRequired,
};

export default System;
