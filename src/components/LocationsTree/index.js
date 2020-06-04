import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Tree, Input } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
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
  onGetSelectedLocation,
  singleLocationData,
}) => {
  const [popOverVisible, setpopOverVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const handleSearch = () => {
    // console.log(e.target.value);
  };

  const addLocation = ({ location }) => {
    if (singleLocationData) {
      const { id, locationType } = singleLocationData;
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
    if (singleLocationData) {
      const { id, parentId, lastModifiedTimestamp } = singleLocationData;
      onEditLocation(id, parentId, name, locationType, lastModifiedTimestamp);
      setEditModal(false);
    }
  };

  const deleteLocation = () => {
    const { id } = locationPath[locationPath.length - 1];
    onDeleteLocation(id);
    setDeleteModal(false);
  };

  const handleVisibleChange = visible => {
    setpopOverVisible(visible);
  };

  const handleAddModal = () => {
    const { id } = locationPath[locationPath.length - 1];
    onGetSelectedLocation(id);
    setAddModal(true);
  };

  const handleEditModal = () => {
    const { id } = locationPath[locationPath.length - 1];
    onGetSelectedLocation(id);
    setEditModal(true);
  };

  const handleDeleteModal = () => {
    const { id } = locationPath[locationPath.length - 1];
    onGetSelectedLocation(id);
    setDeleteModal(true);
  };

  const content = (
    <ul className={styles.popOver}>
      <Link
        key={0}
        role="button"
        to="/network"
        onKeyPress={() => {}}
        onClick={() => {
          setpopOverVisible(false);
          handleAddModal();
        }}
      >
        Add Location
      </Link>

      <Link
        key={1}
        role="button"
        to="/network"
        onKeyPress={() => {}}
        onClick={() => {
          setpopOverVisible(false);
          handleEditModal();
        }}
      >
        Edit Location
      </Link>
      <Link
        key={2}
        role="button"
        to="/network"
        onKeyPress={() => {}}
        onClick={() => {
          setpopOverVisible(false);
        }}
      >
        Bulk Edit APs
      </Link>
      <Link
        key={3}
        role="button"
        to="/network"
        onKeyPress={() => {}}
        onClick={() => {
          setpopOverVisible(false);
          handleDeleteModal();
        }}
      >
        Delete Location
      </Link>
    </ul>
  );

  return (
    <div className={styles.sideTree}>
      <div className={styles.searchBar}>
        <Input placeholder="Search Locations" onChange={handleSearch} prefix={<SearchOutlined />} />
      </div>
      <Popover
        visible={popOverVisible}
        onVisibleChange={handleVisibleChange}
        content={content}
        trigger="click"
        placement="rightTop"
      >
        <Tree
          data-testid="locationTree"
          checkable
          checkedKeys={checkedLocations}
          showIcon
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={locations}
        />
      </Popover>
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
            <strong> {singleLocationData && singleLocationData.name}</strong>
          </p>
        }
      />
      <AddFormModal
        locationPath={locationPath}
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addLocation}
        title="Add Account"
      />

      <EditFormModal
        locationPath={locationPath}
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={editLocation}
        title="Edit Account"
        locationName="Floor zero"
        singleLocationData={singleLocationData}
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
  onDeleteLocation: PropTypes.func,
  onGetSelectedLocation: PropTypes.func,
  singleLocationData: PropTypes.shape({
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
  onGetSelectedLocation: () => {},
  singleLocationData: {},
};

export default LocationsTree;
