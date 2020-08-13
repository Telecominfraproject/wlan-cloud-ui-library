import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Breadcrumb } from 'antd';
import { WifiOutlined, LeftOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Modal from 'components/Modal';
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
}) => {
  const [tab, setTab] = useState('general');
  const [isGeneralFormDirty, setIsGeneralFormDirty] = useState(false);
  const [isLocationFormDirty, setIsLocationFormDirty] = useState(false);
  const [isFirmwareFormDirty, setIsFirmwareFormDirty] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);

  const history = useHistory();

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

  const handleGeneralFormChange = () => {
    if (!isGeneralFormDirty) {
      setIsGeneralFormDirty(true);
    }
  };

  const handleLocationFormChange = () => {
    if (!isLocationFormDirty) {
      setIsLocationFormDirty(true);
    }
  };

  const handleFirmwareFormChange = () => {
    if (!isFirmwareFormDirty) {
      setIsFirmwareFormDirty(true);
    }
  };

  const handleGeneralFormSave = () => {
    setIsGeneralFormDirty(false);
  };

  const handleLocationFormSave = () => {
    setIsLocationFormDirty(false);
  };

  const handleFirmwareFormSave = () => {
    setIsFirmwareFormDirty(false);
  };

  const handleOnBack = () => {
    if (isGeneralFormDirty || isLocationFormDirty || isFirmwareFormDirty) {
      setConfirmModal(true);
    } else {
      history.push(`/network/access-points`);
    }
  };

  const breadCrumbs = getLocationPath(data.locationId, locations).map(location => (
    <Breadcrumb.Item key={location.id}>{location.name}</Breadcrumb.Item>
  ));

  return (
    <div className={styles.AccessPointDetails}>
      <Modal
        onCancel={() => setConfirmModal(false)}
        onSuccess={() => history.push(`/network/access-points`)}
        visible={confirmModal}
        buttonText="Back"
        title="Leave Form?"
        content={<p>Please confirm exiting without saving this Access Point. </p>}
      />
      <Button icon={<LeftOutlined />} onClick={handleOnBack}>
        BACK
      </Button>
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
          handleOnFormChange={handleGeneralFormChange}
          handleOnFormSave={handleGeneralFormSave}
        />
      )}
      {tab === 'status' && <Status data={data} />}
      {tab === 'location' && (
        <Location
          data={data}
          locations={locations}
          onUpdateEquipment={onUpdateEquipment}
          handleOnFormChange={handleLocationFormChange}
          handleOnFormSave={handleLocationFormSave}
        />
      )}
      {tab === 'os' && <OS data={data} osData={osData} handleRefresh={handleRefresh} />}
      {tab === 'firmware' && (
        <Firmware
          firmware={firmware}
          data={data}
          onUpdateEquipmentFirmware={onUpdateEquipmentFirmware}
          handleOnFormChange={handleFirmwareFormChange}
          handleOnFormSave={handleFirmwareFormSave}
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
};

AccessPointDetails.defaultProps = {
  data: {},
  firmware: {},
  profiles: [],
  osData: {},
};

export default AccessPointDetails;
