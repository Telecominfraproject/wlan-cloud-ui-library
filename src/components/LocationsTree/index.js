import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const LocationsTree = ({ locations, checkedLocations, onSelect, onCheck }) => {
  const handleSearch = () => {
    // console.log(e.target.value);
  };
  return (
    <div className={styles.sideTree}>
      <div className={styles.searchBar}>
        <Input placeholder="Search Locations" onChange={handleSearch} prefix={<SearchOutlined />} />
      </div>
      <Tree
        data-testid="locationTree"
        checkable
        checkedKeys={checkedLocations}
        showIcon
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={locations}
      />
    </div>
  );
};

LocationsTree.propTypes = {
  onCheck: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  checkedLocations: PropTypes.instanceOf(Array).isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
};

export default LocationsTree;
