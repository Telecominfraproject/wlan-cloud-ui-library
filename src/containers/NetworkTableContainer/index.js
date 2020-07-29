import React from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import ToggleButton from 'components/ToggleButton';
import NetworkTable from 'components/NetworkTable';
import styles from './index.module.scss';

const NetworkTableContainer = ({
  activeTab,
  reloadTable,
  tableColumns,
  tableData,
  onLoadMore,
  isLastPage,
}) => {
  return (
    <>
      <div className={styles.headerBtnContent}>
        <ToggleButton activeTab={activeTab} />
        <Button onClick={reloadTable} title="reload" icon={<ReloadOutlined />} />
      </div>
      <NetworkTable
        tableColumns={tableColumns}
        tableData={tableData}
        onLoadMore={onLoadMore}
        isLastPage={isLastPage}
      />
    </>
  );
};

NetworkTableContainer.propTypes = {
  activeTab: PropTypes.string.isRequired,
  reloadTable: PropTypes.func.isRequired,
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool.isRequired,
};

export default NetworkTableContainer;
