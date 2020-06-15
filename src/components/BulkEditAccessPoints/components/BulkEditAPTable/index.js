import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const BulkEditAPTable = ({ tableColumns, tableData }) => {
  return (
    <Table columns={tableColumns} dataSource={tableData} scroll={{ x: 2000 }} pagination={false} />
  );
};

BulkEditAPTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
};

BulkEditAPTable.defaultProps = {
  tableData: [],
};

export default BulkEditAPTable;
