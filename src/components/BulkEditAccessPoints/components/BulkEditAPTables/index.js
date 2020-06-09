import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const BulkEditAPTables = ({ tableColumns, tableData }) => {
  return (
    <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} pagination={false} />
  );
};

BulkEditAPTables.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
};

BulkEditAPTables.defaultProps = {
  tableData: [],
};

export default BulkEditAPTables;
