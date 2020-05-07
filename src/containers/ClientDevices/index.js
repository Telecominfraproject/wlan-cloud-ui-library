import React, { useState } from 'react';
import { WifiOutlined, ReloadOutlined } from '@ant-design/icons';
import DeviceTable from 'components/DeviceTable';
import LocationsTree from 'components/LocationsTree';
import styles from './index.module.scss';

const treeData = [
  {
    title: 'Las Vegas',
    key: 0,
    children: [
      {
        title: 'Mobilitie',
        key: '0-0-0',
        children: [
          {
            title: 'Lab',
            key: '0-0-0-0',
            children: [
              {
                title: 'App100',
                key: '0-0-0-0-0',
                icon: <WifiOutlined />,
              },
              {
                title: 'App101',
                key: '0-0-0-0-1',
                icon: <WifiOutlined />,
              },
              {
                title: 'App102',
                key: '0-0-0-0-2',
                icon: <WifiOutlined />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Washington, D.C.',
    key: 1,
    children: [
      {
        title: 'Mobilitie',
        key: '0-1-0',
        children: [
          {
            title: 'Lab',
            key: '0-1-0-0',
            children: [
              {
                title: 'App100',
                key: '0-1-0-0-0',
                icon: <WifiOutlined />,
              },
              {
                title: 'App101',
                key: '0-1-0-0-1',
                icon: <WifiOutlined />,
              },
              {
                title: 'App102',
                key: '0-1-0-0-2',
                icon: <WifiOutlined />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Los Angeles',
    key: 2,
    children: [
      {
        title: 'Mobilitie',
        key: '0-2-0',
        children: [
          {
            title: 'Lab',
            key: '0-2-0-0',
            children: [
              {
                title: 'App100',
                key: '0-2-0-0-0',
                icon: <WifiOutlined />,
              },
              {
                title: 'App101',
                key: '0-2-0-0-1',
                icon: <WifiOutlined />,
              },
              {
                title: 'App102',
                key: '0-2-0-0-2',
                icon: <WifiOutlined />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const ClientDevices = () => {
  const [locations, setLocationTree] = useState([]);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    if (info.checked) {
      setLocationTree(locations => [...locations, info.node.key]);
    } else {
      const index = locations.indexOf(info.node.key);
      setLocationTree([...locations.slice(0, index), ...locations.slice(index + 1)]);
    }
  };

  return (
    <div className={styles.clientDevices}>
      <div className={styles.mainWrapper}>
        <LocationsTree treeData={treeData} onSelect={onSelect} onCheck={onCheck} />
        <div className={styles.mainContent}>
          <div className={styles.headerContent}>
            <div className={styles.navBtnWrapper}>
              <div className={styles.navBtn}>
                <a href="#">Access Points</a>
              </div>
              <div className={styles.navBtn}>
                <a href="#" className={styles.activeBtn}>
                  Client Devices
                </a>
              </div>
            </div>
            <div className={styles.reloadBtn}>
              <span className={styles.reloadIcon}>
                <ReloadOutlined />
              </span>
            </div>
          </div>
          <DeviceTable SelectedLocations={locations} />
        </div>
      </div>
    </div>
  );
};

export default ClientDevices;
