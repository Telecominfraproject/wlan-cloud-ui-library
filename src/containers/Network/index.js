import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import LocationsTree from 'components/LocationsTree';
import ToggleButton from 'components/ToggleButton';
import styles from './index.module.scss';

const Network = ({
  locations,
  checkedLocations,
  onSelect,
  onCheck,
  activeTab,
  children,
  locationPath,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
  selectedLocation,
  deleteModal,
  editModal,
  addModal,
  setAddModal,
  setEditModal,
  setDeleteModal,
}) => {
  const location = useLocation();

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
          locationPath={locationPath}
          onAddLocation={onAddLocation}
          onEditLocation={onEditLocation}
          onDeleteLocation={onDeleteLocation}
          selectedLocation={selectedLocation}
          deleteModal={deleteModal}
          editModal={editModal}
          addModal={addModal}
          setAddModal={setAddModal}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
        />
        <div className={styles.mainContent}>
          {location.pathname === '/network/access-points' ||
          location.pathname === '/network/client-devices' ? (
            <div className={styles.headerContent}>
              <ToggleButton activeTab={activeTab} />
              <Button onClick={onReload} title="reload" icon={<ReloadOutlined />} />
            </div>
          ) : (
            ''
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
  locationPath: PropTypes.instanceOf(Array),
  onAddLocation: PropTypes.func.isRequired,
  onEditLocation: PropTypes.func.isRequired,
  onDeleteLocation: PropTypes.func.isRequired,
  deleteModal: PropTypes.bool.isRequired,
  editModal: PropTypes.bool.isRequired,
  addModal: PropTypes.bool.isRequired,
  setAddModal: PropTypes.func.isRequired,
  setEditModal: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({
    id: PropTypes.number,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.number,
  }),
};

Network.defaultProps = {
  locationPath: [],
  selectedLocation: {},
};

export default Network;
