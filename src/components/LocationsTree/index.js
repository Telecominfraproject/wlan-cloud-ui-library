import React from 'react';
import PropTypes from 'prop-types';

import { Tree, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const LocationsTree = props => {
  return (
    <div className={styles.sideTree}>
      <div className={styles.searchBar}>
        <Input
          placeholder="Search Locations"
          onChange={e => console.log(e.target.value)}
          prefix={<SearchOutlined />}
        />
      </div>
      <Tree
        checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={[]}
        showIcon={true}
        onSelect={props.onSelect}
        onCheck={props.onCheck}
        treeData={props.treeData}
      />
    </div>
  );
};

LocationsTree.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  treeData: PropTypes.array.isRequired,
};

export default LocationsTree;
