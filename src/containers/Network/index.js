import React from 'react';
import { useLocation, Link } from 'react-router-dom';
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
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
  onCreateEquipment,
  selectedLocation,
  deleteModal,
  editModal,
  addModal,
  apModal,
  setAddModal,
  setEditModal,
  setDeleteModal,
  setApModal,
  profiles,
  loadingProfile,
  errorProfile,
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
          onAddLocation={onAddLocation}
          onEditLocation={onEditLocation}
          onDeleteLocation={onDeleteLocation}
          onCreateEquipment={onCreateEquipment}
          selectedLocation={selectedLocation}
          deleteModal={deleteModal}
          editModal={editModal}
          addModal={addModal}
          apModal={apModal}
          setAddModal={setAddModal}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
          setApModal={setApModal}
          profiles={profiles}
          loadingProfile={loadingProfile}
          errorProfile={errorProfile}
        />
        <div className={styles.mainContent}>
          {location.pathname === '/network/access-points' ||
          location.pathname === '/network/client-devices' ? (
            <div className={styles.headerContent}>
              <ToggleButton activeTab={activeTab} />
              {location.pathname === '/network/client-devices' && (
                <Link to="/system/blockedlist" className={styles.BlockedListButton}>
                  <Button> Blocked List</Button>
                </Link>
              )}
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
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.string.isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  profiles: PropTypes.instanceOf(Array).isRequired,
  checkedLocations: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onAddLocation: PropTypes.func.isRequired,
  onEditLocation: PropTypes.func.isRequired,
  onDeleteLocation: PropTypes.func.isRequired,
  onCreateEquipment: PropTypes.func.isRequired,
  deleteModal: PropTypes.bool.isRequired,
  editModal: PropTypes.bool.isRequired,
  apModal: PropTypes.bool.isRequired,
  addModal: PropTypes.bool.isRequired,
  setAddModal: PropTypes.func.isRequired,
  setEditModal: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
  setApModal: PropTypes.func.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
  errorProfile: PropTypes.instanceOf(Object),
  selectedLocation: PropTypes.shape({
    id: PropTypes.string,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.string,
  }),
};

Network.defaultProps = {
  selectedLocation: null,
  errorProfile: {},
};

export default Network;
