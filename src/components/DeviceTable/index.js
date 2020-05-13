import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const DeviceTable = ({ tableColumns, tableData }) => {
  return <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} />;
};

DeviceTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
};

export default DeviceTable;
