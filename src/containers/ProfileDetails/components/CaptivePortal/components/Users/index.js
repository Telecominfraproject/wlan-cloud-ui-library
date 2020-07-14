import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import Button from 'components/Button';
import { FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from '../../../index.module.scss';

const Users = ({ userList }) => {
  console.log(userList);
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
      title: 'Activation',
      dataIndex: 'activationTime',
      key: 'activation',
    },
    {
      title: 'Expiry',
      dataIndex: 'expirationTime',
      key: 'expiry',
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      width: 64,
      render: () => <Button title="edit" className={styles.InfoButton} icon={<FormOutlined />} />,
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
    <Card title="Captive Portal Users">
      <div className={styles.InlineEndDiv}>
        <Button> Return to Last Saved</Button>
        <Button> Save</Button>
        <Button icon={<PlusCircleOutlined />}> Add</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} expandable={{}} />
    </Card>
  );
};

Users.propTypes = {
  userList: PropTypes.instanceOf(Object),
};

Users.defaultProps = {
  userList: {},
};

export default Users;
