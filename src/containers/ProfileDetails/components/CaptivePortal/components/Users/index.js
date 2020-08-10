import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import FormModal from '../FormModal';
import styles from '../../../index.module.scss';

const Users = ({ userList, handleAddUser, handleUpdateUser, handleDeleteUser }) => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [tableData, setTableData] = useState(userList);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: 'First Name',
      dataIndex: ['userDetails', 'firstName'],
      width: 150,
    },
    {
      title: 'Last Name',
      dataIndex: ['userDetails', 'lastName'],
    },
    {
      width: 64,
      render: (_, record) => (
        <Button
          className={styles.InfoButton}
          title={`edit-${record.username}`}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setEditModal(true);
            setActiveUser({ ...record });
          }}
        />
      ),
    },

    {
      width: 64,
      render: (_, record) => (
        <Button
          className={styles.InfoButton}
          title={`delete-${record.username}`}
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => {
            setDeleteModal(true);
            setActiveUser({ ...record });
          }}
        />
      ),
    },
  ];

  const addUser = ({ username, password, firstName, lastName }) => {
    const newUser = {
      username,
      password,
      userDetails: {
        firstName,
        lastName,
      },
    };
    setTableData(users => [...users, newUser]);
    handleAddUser(newUser);
    setAddModal(false);
  };

  const updateUser = ({ username, password, firstName, lastName }) => {
    const newUser = {
      username,
      password,
      userDetails: {
        firstName,
        lastName,
      },
    };
    setTableData(users =>
      users.map(user => (user.username === activeUser.username ? newUser : user))
    );

    handleUpdateUser(
      tableData.findIndex(user => user.username === activeUser.username),
      newUser
    );

    setEditModal(false);
  };

  const deleteUser = () => {
    setTableData(users => users.filter(user => user.username !== activeUser.username));
    handleDeleteUser(tableData.findIndex(user => user.username === activeUser.username));
    setDeleteModal(false);
  };

  const usedUserNames = useMemo(() => {
    return tableData.map(i => i.username);
  }, [tableData]);

  return (
    <>
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteUser}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the user: <strong>{activeUser.username}</strong>
          </p>
        }
      />
      <FormModal
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={updateUser}
        title="Edit User"
        username={activeUser.username}
        firstName={activeUser?.userDetails?.firstName}
        lastName={activeUser?.userDetails?.lastName}
        usedUserNames={usedUserNames}
      />
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addUser}
        title="Add User"
        usedUserNames={usedUserNames}
      />
      <Card title="User List" extra={<Button onClick={() => setAddModal(true)}> Add User</Button>}>
        <Table rowKey="username" columns={columns} dataSource={tableData} pagination={false} />
      </Card>
    </>
  );
};

Users.propTypes = {
  userList: PropTypes.instanceOf(Array),
  handleAddUser: PropTypes.func,
  handleUpdateUser: PropTypes.func,
  handleDeleteUser: PropTypes.func,
};

Users.defaultProps = {
  userList: [],
  handleAddUser: () => {},
  handleUpdateUser: () => {},
  handleDeleteUser: () => {},
};

export default Users;
