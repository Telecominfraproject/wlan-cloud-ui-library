import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Button from 'components/Button';
import styles from './index.module.scss';

const NetworkTable = ({ tableColumns, tableData, onLoadMore, isLastPage }) => {
  return (
    <>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        scroll={{ x: 2000 }}
        pagination={false}
      />
      {!isLastPage && (
        <div className={styles.LoadMore}>
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )}
    </>
  );
};

NetworkTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
};

NetworkTable.defaultProps = {
  tableData: [],
  onLoadMore: () => {},
  isLastPage: true,
};

export default NetworkTable;
