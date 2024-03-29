import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import Skeleton from 'components/Skeleton';
import Modal from 'components/Modal';
import styles from './index.module.scss';
import AddFormModal from './components/AddFormModal';
import EditFormModal from './components/EditFormModal';
import AddApModal from './components/AddApModal';

const LocationsTree = ({
  locations,
  checkedLocations,
  selectedLocation,
  onSelect,
  onCheck,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
  onCreateEquipment,
  addModal,
  editModal,
  deleteModal,
  apModal,
  setAddModal,
  setEditModal,
  setDeleteModal,
  setApModal,
  profiles,
  loadingProfile,
  errorProfile,
  onFetchMoreProfiles,
  loadingLocations,
}) => {
  const getLocationPath = () => {
    const locationsPath = [];

    const treeRecurse = (parentNodeId, node) => {
      if (node.id === parentNodeId) {
        locationsPath.unshift({ id: node.id, parentId: node.parentId, name: node.name });
        return node;
      }
      if (node.children) {
        let parent;
        node.children.some(i => {
          parent = treeRecurse(parentNodeId, i);
          return parent;
        });
        if (parent) {
          locationsPath.unshift({ id: node.id, parentId: node.parentId, name: node.name });
        }
        return parent;
      }

      return null;
    };

    if (selectedLocation) {
      locationsPath.unshift({ ...selectedLocation });
      treeRecurse(selectedLocation.parentId, locations[0]);
    }

    return locationsPath;
  };

  return (
    <div className={styles.sideTree}>
      <Skeleton loading={loadingLocations}>
        <Tree
          data-testid="locationTree"
          checkable
          checkedKeys={checkedLocations}
          showIcon
          blockNode
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={locations}
          defaultExpandAll
          checkStrictly
        />
      </Skeleton>

      <AddFormModal
        locationPath={getLocationPath()}
        visible={addModal}
        onSubmit={onAddLocation}
        onCancel={() => setAddModal(false)}
        title="Add Location"
      />
      <AddApModal
        visible={apModal}
        onSubmit={onCreateEquipment}
        onCancel={() => setApModal(false)}
        profiles={profiles}
        title="Add Access Point"
        buttonText="Add"
        loadingProfile={loadingProfile}
        errorProfile={errorProfile}
        onFetchMoreProfiles={onFetchMoreProfiles}
      />

      <EditFormModal
        visible={editModal}
        onSubmit={onEditLocation}
        onCancel={() => setEditModal(false)}
        title="Edit Location"
        selectedLocation={selectedLocation}
      />
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={onDeleteLocation}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the Location:{' '}
            <i>{selectedLocation && selectedLocation.name}</i> and ALL its sub locations?
          </p>
        }
      />
    </div>
  );
};

LocationsTree.propTypes = {
  onCheck: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  checkedLocations: PropTypes.instanceOf(Array).isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  profiles: PropTypes.instanceOf(Array).isRequired,
  onAddLocation: PropTypes.func,
  onEditLocation: PropTypes.func,
  onDeleteLocation: PropTypes.func,
  onCreateEquipment: PropTypes.func,
  addModal: PropTypes.bool.isRequired,
  editModal: PropTypes.bool.isRequired,
  deleteModal: PropTypes.bool.isRequired,
  apModal: PropTypes.bool.isRequired,
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
  loadingLocations: PropTypes.bool,
};

LocationsTree.defaultProps = {
  onAddLocation: () => {},
  onEditLocation: () => {},
  onDeleteLocation: () => {},
  onCreateEquipment: () => {},
  selectedLocation: null,
  errorProfile: {},
  onFetchMoreProfiles: () => {},
  loadingLocations: false,
};

export default LocationsTree;
