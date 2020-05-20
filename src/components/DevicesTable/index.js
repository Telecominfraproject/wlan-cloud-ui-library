import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const DevicesTable = ({ tableColumns, tableData }) => {
  return <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} />;
};

DevicesTable.defaultProps = {
  tableData: [],
};

DevicesTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
};

export default DevicesTable;
