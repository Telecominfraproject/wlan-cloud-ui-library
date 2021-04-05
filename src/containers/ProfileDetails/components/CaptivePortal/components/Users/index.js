import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';
import { FormOutlined } from '@ant-design/icons';
import { useWritableInput } from 'contexts/InputDisabledContext';

import FormModal from '../FormModal';
import styles from '../../../index.module.scss';

const Users = ({ userList, handleAddUser, handleUpdateUser, handleDeleteUser }) => {
  const { roleIsWritable } = useWritableInput();
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
    ...(roleIsWritable
      ? [
          {
            width: 64,
            render: (_, record) => (
              <Button
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
        ]
      : []),
    ...(roleIsWritable
      ? [
          {
            width: 64,
            render: (_, record) => (
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
                    Are you sure you want to delete the user:{' '}
                    <strong> {activeUser.username}</strong>?
                  </p>
                }
              />
            ),
          },
        ]
      : []),
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
        extra={roleIsWritable && <Button onClick={() => setAddUserModal(true)}> Add User</Button>}
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
