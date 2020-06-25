import React from 'react';
import DeviceStatsCard from './components/DeviceStatsCard';
import styles from './index.module.scss';

const Dashboard = () => {
  const accessPointsData = {
    'Total Provisioned': 12,
    'In Service': 25,
    'With Clients': 12,
    'Out Of Service': 2,
    'Never Connected': 5,
  };

  const clientDevicesData = {
    'Total Associated': 250,
    '5G Associated': 220,
    '2.4G Associated': 30,
  };

  const usageInformation = {
    'Total 24 hrs Volume (US+DS)': 112.3,
    'Total Average traffic (US)': '2.4 Mb/s',
    'Total Average traffic (DS)': '10.3 Mb/s',
    'Total 24 hrs Unique Devices': 110,
    'Most Active AP': 'AP120',
    'Most Active Client': 'client_mac',
  };

  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.leftInfoWrap} />
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          <DeviceStatsCard title="Access Points" cardData={accessPointsData} />
          <DeviceStatsCard title="Client Devices" cardData={clientDevicesData} />
          <DeviceStatsCard title="Usage Information" cardData={usageInformation} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
