import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';

import Button from 'components/Button';
import Loading from 'components/Loading';
import ToggleButton from 'components/ToggleButton';
import NetworkTable from 'components/NetworkTable';
import ThemeContext from 'contexts/ThemeContext';

import styles from './index.module.scss';

const NetworkTableContainer = ({
  activeTab,
  onRefresh,
  tableColumns,
  tableData,
  onLoadMore,
  isLastPage,
  loading,
  error,
  extraTools,
}) => {
  const { routes } = useContext(ThemeContext);

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
        activeTab={activeTab}
      />
    );
  };

  return (
    <>
      <div className={styles.headerBtnContent}>
        <ToggleButton activeTab={activeTab} />
        {extraTools}
        <div className={styles.RightHeaderDiv}>
          {activeTab === routes.clientDevices && (
            <Link to={routes.blockedlist} className={styles.BlockedListButton}>
              <Button>Blocked List</Button>
            </Link>
          )}
          <Button onClick={onRefresh} title="reload" icon={<ReloadOutlined />} />
        </div>
      </div>
      {renderContent()}
    </>
  );
};

NetworkTableContainer.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  activeTab: PropTypes.string.isRequired,
  tableData: PropTypes.instanceOf(Array),
  onRefresh: PropTypes.func,
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  extraTools: PropTypes.node,
};

NetworkTableContainer.defaultProps = {
  tableData: [],
  onRefresh: () => {},
  onLoadMore: () => {},
  isLastPage: true,
  loading: false,
  error: null,
  extraTools: null,
};

export default NetworkTableContainer;
