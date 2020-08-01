import React from 'react';
import { Card, Table } from 'antd';
import Button from 'components/Button';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../../index.module.scss';

const Users = () => {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'First Name',
      dataIndex: ['userDetails', 'firstName'],
      key: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: ['userDetails', 'lastName'],
      key: 'lname',
    },
    {
      width: 64,
      render: () => (
        <Button title="edit" type="primary" className={styles.InfoButton} icon={<FormOutlined />} />
      ),
    },

    {
      width: 64,
      render: () => (
        <Button
          title="delete"
          type="danger"
          className={styles.InfoButton}
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const data = [
    {
      username: 'UserName',
      userDetails: {
        firstName: 'First Name',
        lastName: 'Last Name',
      },
      activationTime: 'activationTime',
      expirationTime: 'expirationTime',
    },
  ];

  return (
    <Card title="User List">
      <div className={styles.InlineEndDiv}>
        <Button> Add User</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default Users;
