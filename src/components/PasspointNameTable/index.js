import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const PasspointNameTable = ({ tableData, dataIndex, removeName }) => {
  const formatCols = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'dupleName',
        width: 500,
      },
      {
        title: 'Locale',
        dataIndex: 'locale',
      },
      {
        title: '',
        width: 80,
        render: item => (
          <Button
            title="removeItem"
            icon={<DeleteOutlined />}
            onClick={() => removeName(item, dataIndex)}
          />
        ),
      },
    ];
  };

  return (
    <Table
      dataSource={tableData}
      columns={formatCols(dataIndex)}
      pagination={false}
      rowKey={record => record.dupleName + record.locale}
    />
  );
};

PasspointNameTable.propTypes = {
  tableData: PropTypes.instanceOf(Array),
  dataIndex: PropTypes.string.isRequired,
  removeName: PropTypes.func.isRequired,
};

PasspointNameTable.defaultProps = {
  tableData: [],
};

export default PasspointNameTable;
