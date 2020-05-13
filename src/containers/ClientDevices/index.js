import React from 'react';
import PropTypes from 'prop-types';
import DeviceTable from 'components/DeviceTable';
import LocationsTree from 'components/LocationsTree';
import ReloadButton from 'components/ReloadButton';
import styles from './index.module.scss';

const ClientDevices = ({
  tableColumns,
  locations,
  tableData,
  checkedLocations,
  onSelect,
  onCheck,
}) => {
  const onReload = () => {
    // console.log('Reload Button Clicked');
  };
  return (
    <div className={styles.clientDevices}>
      <div className={styles.mainWrapper}>
        <LocationsTree
          locations={locations}
          onSelect={onSelect}
          onCheck={onCheck}
          checkedLocations={checkedLocations}
        />
        <div className={styles.mainContent}>
          <div className={styles.headerContent}>
            <div className={styles.navBtnWrapper}>
              <div className={styles.navBtn}>
                <a href="/network/client-devices">Access Points</a>
              </div>
              <div className={styles.navBtn}>
                <a href="/network/client-devices" className={styles.activeBtn}>
                  Client Devices
                </a>
              </div>
            </div>
            <ReloadButton onReload={onReload} />
          </div>
          <DeviceTable tableColumns={tableColumns} tableData={tableData} />
        </div>
      </div>
    </div>
  );
};

ClientDevices.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
  checkedLocations: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default ClientDevices;
