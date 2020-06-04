import React, { useState } from 'react';
import { Table } from 'antd';
import { FormOutlined, DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Container from 'components/Container';
import Header from 'components/Header';
import Button from 'components/Button';
import Modal from 'components/Modal';
import styles from './index.module.scss';
import FormModal from './components/FormModal';

const Accounts = ({ data, onCreateUser, onEditUser, onDeleteUser, onLoadMore, isLastPage }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [activeUser, setActiveUser] = useState({
    id: 0,
    email: '',
    role: '',
    customerId: '',
    lastModifiedTimestamp: 0,
  });

  const deleteUser = () => {
    const { id } = activeUser;
    onDeleteUser(id);
    setDeleteModal(false);
  };

  const addUser = ({ email, role, password }) => {
    onCreateUser(email, password, role);
    setAddModal(false);
  };

  const editUser = ({ email, role, password }) => {
    const { id, lastModifiedTimestamp } = activeUser;
    onEditUser(id, email, password, role, lastModifiedTimestamp);
    setEditModal(false);
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
      width: 64,
      render: (_, record) => (
        <Button
          title="edit"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setEditModal(true);
            setActiveUser({
              id: record.id,
              email: record.email,
              role: record.role,
              customerId: record.customerId,
              lastModifiedTimestamp: record.lastModifiedTimestamp,
            });
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: 64,
      render: (_, record) => (
        <Button
          title="delete"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            setDeleteModal(true);
            setActiveUser({
              id: record.id,
              email: record.email,
              role: record.role,
              customerId: record.customerId,
              lastModifiedTimestamp: record.lastModifiedTimestamp,
            });
          }}
        />
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <h1>Accounts</h1>
        <Button title="addaccount" type="primary" onClick={() => setAddModal(true)}>
          Add Account
        </Button>
      </Header>
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteUser}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the account: <strong> {activeUser.email}</strong>
          </p>
        }
      />
      <FormModal
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={editUser}
        title="Edit Account"
        userRole={activeUser.role}
        userEmail={activeUser.email}
      />
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addUser}
        title="Add Account"
      />
      <Table dataSource={data} columns={columns} pagination={false} rowKey="id" />
      {!isLastPage && (
        <div className={styles.LoadMore}>
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )}
    </Container>
  );
};

Accounts.propTypes = {
  onCreateUser: PropTypes.func.isRequired,
  onEditUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array),
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
};

Accounts.defaultProps = {
  data: [],
  onLoadMore: () => {},
  isLastPage: true,
};

export default Accounts;
