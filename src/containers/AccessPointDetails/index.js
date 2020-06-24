import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { WifiOutlined, LeftOutlined } from '@ant-design/icons';
import Button from 'components/Button';

import General from './components/General';
import Firmware from './components/Firmware';
import Location from './components/Location';
import OS from './components/OS';
import Status from './components/Status';

import styles from './index.module.scss';

const AccessPointDetails = ({ data, osData, handleRefresh, locations, onUpdateEquipment }) => {
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
    <div className={styles.AccessPointDetails}>
      <Link to="/network/access-points">
        <Button className={styles.backButton} icon={<LeftOutlined />} name="back">
          BACK
        </Button>
      </Link>
      <Card
        title={
          <div className={styles.InlineBlockDiv}>
            <WifiOutlined className={styles.WifiIcon} />
            <div className={styles.InlineBlockDiv}>
              <div> {data.name} </div>
              <div> LAB TYPE </div>
              <div>
                {data.alarmsCount} &nbsp;{data.alarmsCount === 1 ? 'Alarm' : 'Alarms'}
              </div>
            </div>
          </div>
        }
        extra={
          <div>
            <div>
              <strong> Model:</strong> &nbsp; {data.model}
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

      {tab === 'general' && <General data={data} onUpdateEquipment={onUpdateEquipment} />}
      {tab === 'status' && <Status data={data} />}
      {tab === 'location' && (
        <Location data={data} locations={locations} onUpdateEquipment={onUpdateEquipment} />
      )}
      {tab === 'os' && <OS data={data} osData={osData[0].values} handleRefresh={handleRefresh} />}
      {tab === 'firmware' && <Firmware />}
    </div>
  );
};

AccessPointDetails.propTypes = {
  data: PropTypes.instanceOf(Object),
  osData: PropTypes.instanceOf(Array),
  handleRefresh: PropTypes.func.isRequired,
  onUpdateEquipment: PropTypes.func.isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
};

AccessPointDetails.defaultProps = {
  data: {},
  osData: [],
};

export default AccessPointDetails;
