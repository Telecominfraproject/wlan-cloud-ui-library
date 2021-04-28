import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import DeleteButton from 'components/DeleteButton';
import WithRoles, { RoleProtectedBtn } from 'components/WithRoles';
import { FormOutlined } from '@ant-design/icons';

import FormModal from '../FormModal';
import styles from '../../../index.module.scss';

const Users = ({ userList, handleAddUser, handleUpdateUser, handleDeleteUser }) => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [activeUser, setActiveUser] = useState({});

  const addUser = ({ username, password, firstName, lastName }) => {
    const newUser = {
      username,
      password,
      userDetails: {
        firstName,
        lastName,
      },
    };
    handleAddUser(newUser);
    setAddUserModal(false);
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

    handleUpdateUser(activeUser.username, newUser);
    setEditUserModal(false);
  };

  const deleteUser = () => {
    handleDeleteUser(activeUser.username);
  };

  const usedUserNames = useMemo(() => {
    return userList.map(i => i.username);
  }, [userList]);

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
        <RoleProtectedBtn
          className={styles.InfoButton}
          title={`edit-${record.username}`}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setEditUserModal(true);
            setActiveUser({ ...record });
          }}
        />
      ),
    },
    {
      width: 64,
      render: (_, record) => (
        <WithRoles>
          <DeleteButton
            title={`delete-${record.username}`}
            className={styles.InfoButton}
            type="primary"
            extraOnClick={() => {
              setActiveUser({ ...record });
            }}
            onSuccess={deleteUser}
            content={
              <p>
                Are you sure you want to delete the user: <strong> {activeUser.username}</strong>?
              </p>
            }
          />
        </WithRoles>
      ),
    },
  ];
  return (
    <>
      <FormModal
        onCancel={() => setEditUserModal(false)}
        visible={editUserModal}
        onSubmit={updateUser}
        title="Edit User"
        username={activeUser.username}
        password={activeUser.password}
        firstName={activeUser?.userDetails?.firstName}
        lastName={activeUser?.userDetails?.lastName}
        usedUserNames={usedUserNames}
      />
      <FormModal
        onCancel={() => setAddUserModal(false)}
        visible={addUserModal}
        onSubmit={addUser}
        title="Add User"
        usedUserNames={usedUserNames}
      />
      <Card
        title="User List"
        extra={<RoleProtectedBtn onClick={() => setAddUserModal(true)}> Add User</RoleProtectedBtn>}
      >
        <Table rowKey="username" columns={columns} dataSource={userList} pagination={false} />
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
