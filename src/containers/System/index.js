import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';
import styles from './index.module.scss';

const System = ({ children }) => {
  const location = useLocation();

  const { TabPane } = Tabs;

  return (
    <div>
      <div className={styles.System}>
        {location.pathname === '/system/manufacturer' ||
        location.pathname === '/system/firmware' ? (
          <Container>
            <Tabs>
              <TabPane
                tab={<Link to="/system/manufacturer">Device Manufacturer</Link>}
                key="manufacturer"
                data-testId="manufacturer"
              />
              <TabPane
                tab={<Link to="/system/firmware">Firmware</Link>}
                key="firmware"
                data-testid="firmware"
              />
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
