import React from 'react';
import PropTypes from 'prop-types';
import LocationsTree from 'components/LocationsTree';
import styles from './index.module.scss';

const Network = ({
  locations,
  checkedLocations,
  onSelect,
  onCheck,
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
  onFetchMoreProfiles,
  isLastProfilesPage,
}) => {
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
          onFetchMoreProfiles={onFetchMoreProfiles}
          isLastProfilesPage={isLastProfilesPage}
        />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
};

Network.propTypes = {
  children: PropTypes.node.isRequired,
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
  onFetchMoreProfiles: PropTypes.func,
  isLastProfilesPage: PropTypes.bool,
};

Network.defaultProps = {
  selectedLocation: null,
  errorProfile: {},
  onFetchMoreProfiles: () => {},
  isLastProfilesPage: true,
};

export default Network;
