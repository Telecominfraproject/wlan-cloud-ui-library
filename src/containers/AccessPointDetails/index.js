import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Breadcrumb } from 'antd';
import { WifiOutlined, LeftOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ThemeContext from 'contexts/ThemeContext';
import { getLocationPath } from 'utils/locations';

import General from './components/General';
import Firmware from './components/Firmware';
import Location from './components/Location';
import OS from './components/OS';
import Status from './components/Status';

import styles from './index.module.scss';

const TAB_LIST = [
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

const AccessPointDetails = ({
  data,
  profiles,
  firmware,
  osData,
  handleRefresh,
  locations,
  onUpdateEquipment,
  onUpdateEquipmentFirmware,
  onRequestEquipmentSwitchBank,
  onRequestEquipmentReboot,
  loadingProfiles,
  errorProfiles,
  loadingFirmware,
  errorFirmware,
  onFetchMoreProfiles,
  goBackRoute,
}) => {
  const { routes } = useContext(ThemeContext);
  const { id, tab } = useParams();
  const history = useHistory();

  const [isFormDirty, setIsFormDirty] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);

  const [redirectURL, setRedirectURL] = useState();

  const handleOnFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const handlePageChange = (path = routes.accessPoints) => {
    if (isFormDirty) {
      setRedirectURL(path);
      setConfirmModal(true);
    } else {
      history.push(path);
    }
  };

  const handleOnFirmwareSave = (dataId, versionId) => {
    onUpdateEquipmentFirmware(dataId, versionId);
    setIsFormDirty(false);
  };

  const handleOnEquipmentSave = equipment => {
    onUpdateEquipment(...Object.values(equipment));
    setIsFormDirty(false);
  };

  const breadCrumbs = getLocationPath(data.locationId, locations).map(item => (
    <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
  ));

  return (
    <div className={styles.AccessPointDetails}>
      <Modal
        onCancel={() => {
          setConfirmModal(false);
        }}
        onSuccess={() => {
          setConfirmModal(false);
          setIsFormDirty(false);
          if (redirectURL) {
            history.push(redirectURL);
          } else {
            history.goBack();
          }
        }}
        visible={confirmModal}
        buttonText="OK"
        title="Leave Page?"
        content={<p>Please confirm exiting without saving this Access Point page.</p>}
        mask={false}
      />
      <Header>
        <Button icon={<LeftOutlined />} onClick={() => handlePageChange(goBackRoute)}>
          Back
        </Button>
      </Header>
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
        tabList={TAB_LIST}
        onTabChange={key => handlePageChange(`${routes.accessPoints}/${id}/${key}`)}
        activeTabKey={tab}
        bodyStyle={{ marginBottom: '-48px' }}
      />

      {tab === 'general' && (
        <General
          data={data}
          handleOnEquipmentSave={handleOnEquipmentSave}
          profiles={profiles}
          handleOnFormChange={handleOnFormChange}
          loadingProfiles={loadingProfiles}
          errorProfiles={errorProfiles}
          onFetchMoreProfiles={onFetchMoreProfiles}
        />
      )}
      {tab === 'status' && <Status data={data} />}
      {tab === 'location' && (
        <Location
          data={data}
          locations={locations}
          handleOnEquipmentSave={handleOnEquipmentSave}
          handleOnFormChange={handleOnFormChange}
        />
      )}
      {tab === 'os' && <OS data={data} osData={osData} handleRefresh={handleRefresh} />}
      {tab === 'firmware' && (
        <Firmware
          firmware={firmware}
          data={data}
          handleOnFirmwareSave={handleOnFirmwareSave}
          handleOnFormChange={handleOnFormChange}
          onRequestEquipmentSwitchBank={onRequestEquipmentSwitchBank}
          onRequestEquipmentReboot={onRequestEquipmentReboot}
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
  onRequestEquipmentSwitchBank: PropTypes.func.isRequired,
  onRequestEquipmentReboot: PropTypes.func.isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  loadingProfiles: PropTypes.bool,
  errorProfiles: PropTypes.instanceOf(Object),
  loadingFirmware: PropTypes.bool,
  errorFirmware: PropTypes.instanceOf(Object),
  onFetchMoreProfiles: PropTypes.func,
  goBackRoute: PropTypes.string,
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
  onFetchMoreProfiles: () => {},
  goBackRoute: null,
};

export default AccessPointDetails;
