import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { FormOutlined, DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import Modal from '../../components/Modal';
import FormModal from './components/FormModal';

const Accounts = ({ data }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  const hideEditModal = () => {
    setEditModal(false);
  };

  const hideAddModal = () => {
    setAddModal(false);
  };

  const deleteUser = () => {
    console.log('User Deleted');
  };

  const addUser = () => {
    console.log('User Added');
  };

  const editUser = () => {
    console.log('User Edited');
  };

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
      render: () => (
        <Button
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => setEditModal(true)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: () => (
        <Button
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => setDeleteModal(true)}
        />
      ),
    },
  ];
  // const dataSource = data.map(user => ({ key: user.id, email: user.username, role: user.role }));

  const dataSource = [
    {
      key: 1,
      email: 'support@example.com',
      role: 'Admin',
    },
    {
      key: 2,
      email: 'support@example.com',
      role: 'User',
    },
  ];
  return (
    <div className={styles.Container}>
      <div className={styles.TopSection}>
        <h1>Accounts</h1>
        <Button className={styles.addAccount} type="primary" onClick={() => setAddModal(true)}>
          ADD ACCOUNT
        </Button>
      </div>

      <Modal
        onCancel={hideDeleteModal}
        onSuccess={deleteUser}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="DELETE"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the account: <strong> support@example.com</strong>
          </p>
        }
      />
      <FormModal
        onCancel={hideEditModal}
        visible={editModal}
        onSuccess={editUser}
        title="Edit Account"
      />
      <FormModal
        onCancel={hideAddModal}
        visible={addModal}
        onSuccess={addUser}
        title="Add Account"
      />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

Accounts.defaultProps = {
  data: [],
};

Accounts.propTypes = {
  data: PropTypes.instanceOf(Array),
};

export default Accounts;
