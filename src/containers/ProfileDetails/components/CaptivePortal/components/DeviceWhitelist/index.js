import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import Button from 'components/Button';
import { FormOutlined, DeleteFilled, PlusCircleOutlined } from '@ant-design/icons';
import styles from '../../../index.module.scss';

const DeviceWhitelist = ({ whitelist }) => {
  console.log(whitelist);
  const columns = [
    {
      title: 'Created',
      dataIndex: 'lastModifiedTimestamp',
      key: 'created',
    },
    {
      title: 'Device Mac',
      dataIndex: ['macAddress', 'addressAsString'],
      key: 'mac',
    },
    {
      title: 'Label	',
      dataIndex: 'notes',
      key: 'label',
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      width: 64,
      render: () => <Button title="edit" className={styles.InfoButton} icon={<FormOutlined />} />,
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: 64,
      render: () => <Button title="delete" className={styles.InfoButton} icon={<DeleteFilled />} />,
    },
  ];

  const data = [
    {
      lastModifiedTimestamp: 'July, 10, 2020',
      notes: 'Test',
      macAddress: {
        addressAsString: 'Test',
      },
    },
  ];

  return (
    <Card title="Device Whitelist">
      <div className={styles.InlineEndDiv}>
        <Button> Return to Last Saved</Button>
        <Button> Save</Button>
        <Button icon={<PlusCircleOutlined />}> Add</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

DeviceWhitelist.propTypes = {
  whitelist: PropTypes.instanceOf(Object),
};

DeviceWhitelist.defaultProps = {
  whitelist: {},
};

export default DeviceWhitelist;
