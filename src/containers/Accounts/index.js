import React from 'react';
import { Table, Button } from 'antd';
import { FormOutlined, DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const columns = [
  {
    title: 'E-MAIL',
    dataIndex: 'email',
    key: 'email',
    width: 620,
  },
  {
    title: 'ROLE',
    dataIndex: 'role',
    key: 'role',
    width: 120,
  },
  {
    title: '',
    dataIndex: 'edit',
    key: 'edit',
    render: () => <Button className={styles.InfoButton} type="primary" icon={<FormOutlined />} />,
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    render: () => <Button className={styles.InfoButton} type="primary" icon={<DeleteFilled />} />,
  },
];

const Accounts = ({ data }) => {
  const dataSource = [
    {
      key: '1',
      email: 'support@example.com',
      role: 'Admin',
    },
    {
      key: '2',
      email: 'support@example.com',
      role: 'User',
    },
    {
      key: '3',
      email: 'support@example.com',
      role: 'User',
    },
    {
      key: '4',
      email: 'support@example.com',
      role: 'User',
    },
    {
      key: '5',
      email: 'support@example.com',
      role: 'User',
    },
  ];
  return (
    <div className={styles.Container}>
      <div className={styles.View}>
        <h1>Accounts</h1>
        <Button id={styles.addAccount} type="primary">
          ADD ACCOUNT
        </Button>
      </div>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

Accounts.propTypes = {
  data: PropTypes.isRequired,
};

export default Accounts;
