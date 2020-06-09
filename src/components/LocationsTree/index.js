import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import Modal from 'components/Modal';
import styles from './index.module.scss';
import AddFormModal from './components/AddFormModal';
import EditFormModal from './components/EditFormModal';

const LocationsTree = ({
  locations,
  checkedLocations,
  onSelect,
  onCheck,
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
  const addLocation = ({ location }) => {
    if (selectedLocation) {
      const { id, locationType } = selectedLocation;
      if (locationType === 'COUNTRY') {
        onAddLocation(location, id, 'SITE');
      } else if (locationType === 'SITE') {
        onAddLocation(location, id, 'BUILDING');
      } else if (locationType === 'BUILDING') {
        onAddLocation(location, id, 'FLOOR');
      }
      setAddModal(false);
    }
  };

  const editLocation = ({ name, locationType }) => {
    if (selectedLocation) {
      const { id, parentId, lastModifiedTimestamp } = selectedLocation;
      onEditLocation(id, parentId, name, locationType, lastModifiedTimestamp);
      setEditModal(false);
    }
  };
  const deleteLocation = () => {
    const { id } = locationPath[locationPath.length - 1];
    onDeleteLocation(id);
    setDeleteModal(false);
  };

  return (
    <div className={styles.sideTree}>
      <Tree
        data-testid="locationTree"
        checkable
        checkedKeys={checkedLocations}
        showIcon
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={locations}
      />
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteLocation}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the Location:{' '}
            <strong> {selectedLocation && selectedLocation.name}</strong>
          </p>
        }
      />
      <AddFormModal
        locationPath={locationPath}
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addLocation}
        title="Add Location"
      />

      <EditFormModal
        locationPath={locationPath}
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={editLocation}
        title="Edit Location"
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

LocationsTree.propTypes = {
  onCheck: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  checkedLocations: PropTypes.instanceOf(Array).isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  locationPath: PropTypes.instanceOf(Array),
  onAddLocation: PropTypes.func,
  onEditLocation: PropTypes.func,
  deleteModal: PropTypes.bool.isRequired,
  editModal: PropTypes.bool.isRequired,
  addModal: PropTypes.bool.isRequired,
  setAddModal: PropTypes.func.isRequired,
  setEditModal: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
  onDeleteLocation: PropTypes.func,
  selectedLocation: PropTypes.shape({
    id: PropTypes.number,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.number,
  }),
};

LocationsTree.defaultProps = {
  locationPath: [],
  onAddLocation: () => {},
  onEditLocation: () => {},
  onDeleteLocation: () => {},
  selectedLocation: {},
};

export default LocationsTree;
