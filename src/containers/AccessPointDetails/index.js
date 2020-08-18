import React, { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
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
  const { id, tab } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [isFormDirty, setIsFormDirty] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);

  const [confirmTabModal, setConfirmTabModal] = useState(false);

  const [redirectURL, setRedirectURL] = useState();

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

  const handleFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const handleFormSave = () => {
    setIsFormDirty(false);
  };

  const handleOnBack = () => {
    if (isFormDirty) {
      setConfirmModal(true);
    } else {
      history.push(`/network/access-points`);
    }
  };

  const handleTabChange = key => {
    if (isFormDirty) {
      setConfirmTabModal(true);
      setRedirectURL(`/network/access-points/${id}/${key}`);
    } else {
      history.push(`/network/access-points/${id}/${key}`);
    }
  };

  const breadCrumbs = getLocationPath(data.locationId, locations).map(item => (
    <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
  ));

  return (
    <div className={styles.AccessPointDetails}>
      <Modal
        onCancel={() => setConfirmTabModal(false)}
        onSuccess={() => {
          history.push(redirectURL);
          setConfirmTabModal(false);
          setIsFormDirty(false);
        }}
        visible={confirmTabModal}
        buttonText="Change"
        title="Leave Page?"
        content={<p>Please confirm changing page without saving the current form. </p>}
      />
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
        onTabChange={handleTabChange}
        activeTabKey={tab}
        bodyStyle={{ marginBottom: '-48px' }}
      />

      {location.pathname === `/network/access-points/${id}/general` && (
        <General
          data={data}
          onUpdateEquipment={onUpdateEquipment}
          profiles={profiles}
          handleOnFormChange={handleFormChange}
          handleOnFormSave={handleFormSave}
        />
      )}
      {location.pathname === `/network/access-points/${id}/status` && <Status data={data} />}
      {location.pathname === `/network/access-points/${id}/location` && (
        <Location
          data={data}
          locations={locations}
          onUpdateEquipment={onUpdateEquipment}
          handleOnFormChange={handleFormChange}
          handleOnFormSave={handleFormSave}
        />
      )}
      {location.pathname === `/network/access-points/${id}/os` && (
        <OS data={data} osData={osData} handleRefresh={handleRefresh} />
      )}
      {location.pathname === `/network/access-points/${id}/firmware` && (
        <Firmware
          firmware={firmware}
          data={data}
          onUpdateEquipmentFirmware={onUpdateEquipmentFirmware}
          handleOnFormChange={handleFormChange}
          handleOnFormSave={handleFormSave}
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
