import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';

import styles from './index.module.scss';

const LocationsTree = ({ locations, checkedLocations, onSelect, onCheck }) => {
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
