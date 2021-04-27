import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Breadcrumb } from 'antd';
import { WifiOutlined, LeftOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';
import Header from 'components/Header';
import Modal from 'components/Modal';
import WithRoles from 'components/WithRoles';
import ThemeContext from 'contexts/ThemeContext';
import { getLocationPath } from 'utils/locations';
import { useHistory } from 'hooks';

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
  onRequestEquipmentSwitchBank,
  onRequestEquipmentReboot,
  loadingProfiles,
  errorProfiles,
  loadingFirmware,
  errorFirmware,
  onFetchMoreProfiles,
  onDeleteEquipment,
  extraButtons,
  onSearchProfile,
  extraFields,
  extraTabs,
  extraGeneralCards,
  showStatusAlarms,
  showFirmware,
  avatar,
}) => {
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
    ...(showFirmware
      ? [
          {
            key: 'firmware',
            tab: 'Firmware',
          },
        ]
      : []),
    ...extraTabs.map(extraTab => {
      return {
        key: extraTab.key,
        tab: extraTab.title,
      };
    }),
  ];

  const { routes } = useContext(ThemeContext);
  const { id, tab } = useParams();
  const { history, replaceWithSearch } = useHistory();

  const [isFormDirty, setIsFormDirty] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);

  const [redirectURL, setRedirectURL] = useState();

  const handleOnFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const handlePageChange = path => {
    if (isFormDirty) {
      setRedirectURL(path);
      setConfirmModal(true);
    } else if (path) {
      replaceWithSearch(path);
    } else {
      history.goBack();
    }
  };

  const handleOnFirmwareSave = (dataId, versionId) => {
    onUpdateEquipmentFirmware(dataId, versionId);
    setIsFormDirty(false);
  };

  const handleOnEquipmentSave = equipment => {
    onUpdateEquipment(equipment);
    setIsFormDirty(false);
  };

  const breadCrumbs = getLocationPath(data.locationId, locations).map(item => (
    <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
  ));

  const handleDeleteEquipment = () => {
    onDeleteEquipment();
  };

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
            replaceWithSearch(redirectURL);
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
        <div className={styles.HeaderDiv}>
          <Button icon={<LeftOutlined />} onClick={() => handlePageChange()}>
            Back
          </Button>
        </div>
        <div className={styles.HeaderDiv}>
          <div className={styles.troubleshootBtnsDiv}>{extraButtons}</div>
          <WithRoles>
            <DeleteButton
              showText
              isDanger
              onSuccess={handleDeleteEquipment}
              content={
                <p>
                  Are you sure you want to delete this access point: <strong>{data.name}</strong>?
                </p>
              }
            />
          </WithRoles>
        </div>
      </Header>
      <Card
        title={
          <div className={styles.InlineBlockDiv}>
            {avatar ?? <WifiOutlined className={styles.WifiIcon} />}
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
              {data.baseMacAddress}
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
          onSearchProfile={onSearchProfile}
          extraFields={extraFields}
          extraGeneralCards={extraGeneralCards}
        />
      )}
      {tab === 'status' && <Status data={data} showAlarms={showStatusAlarms} />}
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
      {extraTabs.map(
        extraTab =>
          tab === extraTab.key && (
            <div className={styles.tabContentContainer} key={extraTab.key}>
              {extraTab.component}
            </div>
          )
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
  onDeleteEquipment: PropTypes.func.isRequired,
  extraButtons: PropTypes.node,
  onSearchProfile: PropTypes.func,
  extraFields: PropTypes.instanceOf(Array),
  extraTabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
      component: PropTypes.node,
    })
  ),
  extraGeneralCards: PropTypes.node,
  showStatusAlarms: PropTypes.bool,
  showFirmware: PropTypes.bool,
  avatar: PropTypes.node,
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
  extraButtons: null,
  onSearchProfile: null,
  extraFields: [],
  extraTabs: [],
  extraGeneralCards: null,
  showStatusAlarms: true,
  showFirmware: true,
  avatar: null,
};

export default AccessPointDetails;
