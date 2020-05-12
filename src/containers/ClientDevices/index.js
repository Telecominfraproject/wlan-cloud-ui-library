import React from 'react';
import PropTypes from 'prop-types';
import DeviceTable from 'components/DeviceTable';
import LocationsTree from 'components/LocationsTree';
import ReloadButton from 'components/ReloadButton';
import styles from './index.module.scss';

const ClientDevices = ({ locations, tableData, checkedLocations, onSelect, onCheck }) => {
  const onReload = () => {
    console.log('Reload Button Clicked');
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
                <a href="#">Access Points</a>
              </div>
              <div className={styles.navBtn}>
                <a href="#" className={styles.activeBtn}>
                  Client Devices
                </a>
              </div>
            </div>
            <ReloadButton onReload={onReload} />
          </div>
          <DeviceTable tableData={tableData} />
        </div>
      </div>
    </div>
  );
};

LocationsTree.propTypes = {
  locations: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default ClientDevices;
