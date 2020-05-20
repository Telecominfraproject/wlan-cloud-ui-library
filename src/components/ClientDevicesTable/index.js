import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const ClientDevicesTable = ({ tableColumns, tableData }) => {
  return <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} />;
};

ClientDevicesTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
};

export default ClientDevicesTable;
