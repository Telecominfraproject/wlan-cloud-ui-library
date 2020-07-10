import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';

const System = ({ children }) => {
  const location = useLocation();
  const { TabPane } = Tabs;

  return (
    <div>
      <div>
        {location.pathname === '/system/manufacturer' ? (
          <Container>
            <Tabs defaultActiveKey="manufacturer">
              <TabPane tab="Device Manufacturer" key="manufacturer">
                manufacturer
              </TabPane>
              <TabPane tab="Firmware" key="firmware">
                firmware
              </TabPane>
            </Tabs>
          </Container>
        ) : (
          ''
        )}
        {children}
      </div>
    </div>
  );
};

System.propTypes = {
  children: PropTypes.node.isRequired,
};

export default System;
