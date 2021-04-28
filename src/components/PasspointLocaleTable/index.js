import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RoleProtectedBtn } from 'components/WithRoles';

const PasspointLocaleTable = ({ tableData, dataIndex, removeRow, rowKey }) => {
  const formatCols = useMemo(() => {
    return [
      {
        title: dataIndex === 'osuIconList' ? 'Url' : 'Name',
        dataIndex: dataIndex === 'osuIconList' ? 'imageUrl' : 'dupleName',
        width: 500,
      },
      {
        title: 'Locale',
        dataIndex: dataIndex === 'osuIconList' ? 'iconLocale' : 'locale',
        render: item => {
          switch (item) {
            case 'eng':
            case 'en_CA':
              return 'English';
            case 'fra':
            case 'fr_CA':
              return 'Francais';
            default:
              return item;
          }
        },
      },
      {
        title: '',
        width: 80,
        render: item => (
          <RoleProtectedBtn
            title="removeItem"
            icon={<DeleteOutlined />}
            onClick={() => removeRow(item, dataIndex)}
          />
        ),
      },
    ];
  }, [dataIndex, tableData]);

  return (
    <Table
      dataSource={tableData}
      columns={formatCols}
      pagination={false}
      rowKey={rowKey || 'dupleName'}
    />
  );
};

PasspointLocaleTable.propTypes = {
  tableData: PropTypes.instanceOf(Array),
  dataIndex: PropTypes.string.isRequired,
  removeRow: PropTypes.func.isRequired,
  rowKey: PropTypes.string,
};

PasspointLocaleTable.defaultProps = {
  tableData: [],
  rowKey: '',
};

export default PasspointLocaleTable;
