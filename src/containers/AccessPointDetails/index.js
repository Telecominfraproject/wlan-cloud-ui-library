import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import General from './components/General';
import Firmware from './components/Firmware';
import Location from './components/Location';
import OS from './components/OS';
import Status from './components/Status';

import styles from './index.module.scss';

const AccessPointDetails = ({ data }) => {
  const [tab, setTab] = useState('general');

  const tabList = [
    {
      key: 'general',
      tab: 'General',
    },
    {
      key: 'status',
      tab: 'Status',
    },
    {
      key: 'location',
      tab: 'Location',
    },
    {
      key: 'os',
      tab: 'OS Stats',
    },
    {
      key: 'firmware',
      tab: 'Firmware',
    },
  ];

  return (
    <>
      <Card
        title={
          <div className={styles.InlineBlockDiv}>
            <WifiOutlined className={styles.WifiIcon} />
            <div className={styles.InlineBlockDiv}>
              <div> NAME </div>
              <div> LAB TYPE </div>
              <div> # OF ALARMS</div>
            </div>
          </div>
        }
        extra={
          <div>
            <div>
              <strong> Model:</strong> &nbsp;
            </div>
            <div>
              <strong>IP Address:</strong> &nbsp;
              {data.status.protocol.detailsJSON.reportedIpV4Addr}
            </div>
            <div>
              <strong>MAC:</strong> &nbsp;{data.status.protocol.details.reportedMacAddr}
            </div>
          </div>
        }
        tabList={tabList}
        onTabChange={key => {
          setTab(key);
        }}
        bodyStyle={{ marginBottom: '-48px' }}
      />

      {tab === 'general' && <General data={data} />}
      {tab === 'status' && <Status data={data} />}
      {tab === 'location' && <Location />}
      {tab === 'os' && <OS />}
      {tab === 'firmware' && <Firmware />}
    </>
  );
};

AccessPointDetails.propTypes = {
  data: PropTypes.instanceOf(Array),
};

AccessPointDetails.defaultProps = {
  data: [],
};
export default AccessPointDetails;
