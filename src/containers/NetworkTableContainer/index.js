import React from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';

import Button from 'components/Button';
import Loading from 'components/Loading';
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
  onLoading,
  onError,
  errorDescription,
}) => {
  const renderContent = () => {
    if (onLoading) {
      return <Loading />;
    }
    if (onError) {
      return <Alert message="Error" description={errorDescription} type="error" showIcon />;
    }
    return (
      <NetworkTable
        tableColumns={tableColumns}
        tableData={tableData}
        onLoadMore={onLoadMore}
        isLastPage={isLastPage}
      />
    );
  };

  return (
    <>
      <div className={styles.headerBtnContent}>
        <ToggleButton activeTab={activeTab} />

        {activeTab === '/network/client-devices' && (
          <Link to="/system/blockedlist" className={styles.BlockedListButton}>
            <Button>Blocked List</Button>
          </Link>
        )}
        <Button onClick={reloadTable} title="reload" icon={<ReloadOutlined />} />
      </div>
      {renderContent()}
    </>
  );
};

NetworkTableContainer.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  activeTab: PropTypes.string,
  tableData: PropTypes.instanceOf(Array),
  reloadTable: PropTypes.func,
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
  onLoading: PropTypes.bool,
  onError: PropTypes.bool,
  errorDescription: PropTypes.string,
};

NetworkTableContainer.defaultProps = {
  tableData: [],
  activeTab: '/network/access-points',
  reloadTable: () => {},
  onLoadMore: () => {},
  isLastPage: true,
  onLoading: false,
  onError: false,
  errorDescription: '',
};

export default NetworkTableContainer;
