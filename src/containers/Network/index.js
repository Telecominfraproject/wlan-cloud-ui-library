import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import LocationsTree from 'components/LocationsTree';
import ToggleButton from 'components/ToggleButton';
import styles from './index.module.scss';

const Network = ({ locations, checkedLocations, onSelect, onCheck, activeTab, children }) => {
  const onReload = () => {
    // console.log('Reload Button Clicked');
  };
  const location = useLocation();
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
          {location.pathname === '/network/access-points' ||
          location.pathname === '/network/client-devices' ? (
            <div className={styles.headerContent}>
              <ToggleButton activeTab={activeTab} />
              <Button onClick={onReload} title="reload" icon={<ReloadOutlined />} />
            </div>
          ) : (
            <></>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

Network.propTypes = {
  locations: PropTypes.instanceOf(Array).isRequired,
  checkedLocations: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Network;
