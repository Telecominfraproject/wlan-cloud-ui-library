import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Container from 'components/Container';

import Manufacturer from './components/Manufacturer';
import Firmware from './components/Firmware';

const System = ({ onSearchOUI, onUpdateOUI, returnedOUI }) => {
  const { TabPane } = Tabs;
  return (
    <Container>
      <Tabs defaultActiveKey="manufacturer">
        <TabPane tab="Device Manufacturer" key="manufacturer">
          <Manufacturer
            onSearchOUI={onSearchOUI}
            onUpdateOUI={onUpdateOUI}
            returnedOUI={returnedOUI}
          />
        </TabPane>
        <TabPane tab="Firmware" key="firmware">
          <Firmware />
        </TabPane>
      </Tabs>
    </Container>
  );
};

System.propTypes = {
  onSearchOUI: PropTypes.func.isRequired,
  onUpdateOUI: PropTypes.func.isRequired,
  returnedOUI: PropTypes.instanceOf(Object),
};

System.defaultProps = {
  returnedOUI: {},
};

export default System;
