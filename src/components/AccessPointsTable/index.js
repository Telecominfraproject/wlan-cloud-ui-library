import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const AccessPointsTable = ({ tableColumns, tableData }) => {
  return <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} />;
};

AccessPointsTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
};

export default AccessPointsTable;
