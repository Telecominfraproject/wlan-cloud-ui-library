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
  const dataSource = data.map(user => ({ key: user.id, email: user.email, role: user.role }));

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
