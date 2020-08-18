import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Breadcrumb } from 'antd';
import { WifiOutlined, LeftOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import { getLocationPath } from 'utils/locations';

import General from './components/General';
import Firmware from './components/Firmware';
import Location from './components/Location';
import OS from './components/OS';
import Status from './components/Status';

import styles from './index.module.scss';

const AccessPointDetails = ({
  data,
  profiles,
  firmware,
  osData,
  handleRefresh,
  locations,
  onUpdateEquipment,
  onUpdateEquipmentFirmware,
  loadingProfiles,
  errorProfiles,
  loadingFirmware,
  errorFirmware,
}) => {
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

  const breadCrumbs = getLocationPath(data.locationId, locations).map(location => (
    <Breadcrumb.Item key={location.id}>{location.name}</Breadcrumb.Item>
  ));

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
              <div>
                <Breadcrumb separator=">">{breadCrumbs}</Breadcrumb>
              </div>
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
              {data.status.protocol.detailsJSON &&
                data.status.protocol.detailsJSON.reportedIpV4Addr}
            </div>
            <div>
              <strong>MAC:</strong> &nbsp;
              {data.status.protocol.details && data.status.protocol.details.reportedMacAddr}
            </div>
          </div>
        }
        tabList={tabList}
        onTabChange={key => {
          setTab(key);
        }}
        bodyStyle={{ marginBottom: '-48px' }}
      />

      {tab === 'general' && (
        <General
          data={data}
          onUpdateEquipment={onUpdateEquipment}
          profiles={profiles}
          loadingProfiles={loadingProfiles}
          errorProfiles={errorProfiles}
        />
      )}
      {tab === 'status' && <Status data={data} />}
      {tab === 'location' && (
        <Location data={data} locations={locations} onUpdateEquipment={onUpdateEquipment} />
      )}
      {tab === 'os' && <OS data={data} osData={osData} handleRefresh={handleRefresh} />}
      {tab === 'firmware' && (
        <Firmware
          firmware={firmware}
          data={data}
          onUpdateEquipmentFirmware={onUpdateEquipmentFirmware}
          loadingFirmware={loadingFirmware}
          errorFirmware={errorFirmware}
        />
      )}
    </div>
  );
};

AccessPointDetails.propTypes = {
  data: PropTypes.instanceOf(Object),
  profiles: PropTypes.instanceOf(Array),
  firmware: PropTypes.instanceOf(Object),
  osData: PropTypes.instanceOf(Object),
  handleRefresh: PropTypes.func.isRequired,
  onUpdateEquipment: PropTypes.func.isRequired,
  onUpdateEquipmentFirmware: PropTypes.func.isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  loadingProfiles: PropTypes.bool,
  errorProfiles: PropTypes.instanceOf(Object),
  loadingFirmware: PropTypes.bool,
  errorFirmware: PropTypes.instanceOf(Object),
};

AccessPointDetails.defaultProps = {
  data: {},
  firmware: {},
  profiles: [],
  osData: {},
  loadingProfiles: true,
  errorProfiles: null,
  loadingFirmware: true,
  errorFirmware: null,
};

export default AccessPointDetails;
