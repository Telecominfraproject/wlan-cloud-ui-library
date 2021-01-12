import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from 'components/Button';
import ThemeContext from 'contexts/ThemeContext';
import styles from './index.module.scss';

const NetworkTable = ({ tableColumns, tableData, onLoadMore, isLastPage, activeTab }) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { routes } = useContext(ThemeContext);
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
            onClick: () =>
              activeTab === routes.clientDevices
                ? history.push(`${url}/${record.macAddress}`)
                : history.push(`${url}/${record.id}`),
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
  activeTab: PropTypes.string,
};

NetworkTable.defaultProps = {
  tableData: [],
  onLoadMore: () => {},
  isLastPage: true,
  activeTab: '',
};

export default NetworkTable;
