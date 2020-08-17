import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from 'components/Button';
import styles from './index.module.scss';

const NetworkTable = ({ tableColumns, tableData, onLoadMore, isLastPage }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        scroll={{ x: 2000 }}
        pagination={false}
        rowClassName={styles.Row}
        rowKey="id"
        onRow={record => {
          return {
            onClick: () => {
              history.push(
                url === '/network/client-devices'
                  ? `${url}/${record.id}`
                  : `${url}/${record.id}/general`
              );
            },
          };
        }}
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
