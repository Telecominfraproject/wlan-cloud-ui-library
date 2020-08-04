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
  loading,
  error,
}) => {
  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

NetworkTableContainer.defaultProps = {
  tableData: [],
  activeTab: '/network/access-points',
  reloadTable: () => {},
  onLoadMore: () => {},
  isLastPage: true,
  loading: false,
  error: null,
};

export default NetworkTableContainer;
