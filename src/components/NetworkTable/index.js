import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const NetworkTable = ({ tableColumns, tableData }) => {
  return <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} />;
};

NetworkTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
};

NetworkTable.defaultProps = {
  tableData: [],
};

export default NetworkTable;
