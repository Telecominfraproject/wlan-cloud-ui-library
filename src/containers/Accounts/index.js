import React, { useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';
import WithRoles, { RoleProtectedBtn } from 'components/WithRoles';
import { Table } from 'components/Skeleton';

import useWindowSize from 'hooks/useWindowSize';

import styles from './index.module.scss';
import DefaultModal from './components/FormModal';

const Accounts = ({
  data,
  currentUserId,
  onCreateUser,
  onEditUser,
  onDeleteUser,
  onResetUserPassword,
  onLoadMore,
  isLastPage,
  isAuth0Enabled,
  allUserRoles,
  FormModal,
  loading,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [activeUser, setActiveUser] = useState({});

  const [width] = useWindowSize();

  const deleteUser = () => {
    const { id } = activeUser;
    onDeleteUser(id);
  };

  const addUser = ({ email, roles, password, ...extra }) => {
    onCreateUser({ email, password, roles, ...extra });
    setAddModal(false);
  };

  const editUser = ({ email, roles, password, ...extra }) => {
    const { id, lastModifiedTimestamp } = activeUser;
    onEditUser({ ...activeUser, id, email, password, roles, lastModifiedTimestamp, ...extra });
    setEditModal(false);
  };

  const columns = [
    {
      title: 'E-MAIL',
      dataIndex: 'email',
      key: 'email',
      width: width > 992 && 620,
    },
    {
      title: 'ROLES',
      dataIndex: 'roles',
      key: 'roles',
      width: 120,
      render: r => r?.join(',  '),
    },
    {
      title: '',
      key: 'edit',
      width: 64,
      render: (_, record) => (
        <RoleProtectedBtn
          title={`edit-${record.email}`}
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setEditModal(true);
            setActiveUser({
              ...record,
            });
          }}
        />
      ),
    },
    {
      title: '',
      key: 'delete',
      width: 64,
      render: (_, record) =>
        currentUserId?.toString() !== record.id && (
          <WithRoles>
            <DeleteButton
              className={styles.InfoButton}
              title={`delete-${record.email}`}
              extraOnClick={() => {
                setActiveUser({
                  ...record,
                });
              }}
              onSuccess={deleteUser}
              content={
                <p>
                  Are you sure you want to delete the User: <strong>{activeUser.email}</strong>?
                </p>
              }
            />
          </WithRoles>
        ),
    },
  ];

  return (
    <div className={styles.Container}>
      <Header>
        <h1>Users</h1>
        <RoleProtectedBtn title="addaccount" type="primary" onClick={() => setAddModal(true)}>
          Add User
        </RoleProtectedBtn>
      </Header>

      <FormModal
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={editUser}
        title="Edit User"
        data={activeUser}
        isAuth0Enabled={isAuth0Enabled}
        onResetUserPassword={onResetUserPassword}
        allUserRoles={allUserRoles}
      />
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addUser}
        title="Add User"
        isAuth0Enabled={isAuth0Enabled}
        allUserRoles={allUserRoles}
      />
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
      {!isLastPage && (
        <div className={styles.LoadMore}>
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
};

Accounts.propTypes = {
  onCreateUser: PropTypes.func.isRequired,
  onEditUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onResetUserPassword: PropTypes.func,
  data: PropTypes.instanceOf(Array),
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
  currentUserId: PropTypes.string,
  isAuth0Enabled: PropTypes.bool,
  allUserRoles: PropTypes.instanceOf(Array),
  FormModal: PropTypes.func,
  loading: PropTypes.bool,
};

Accounts.defaultProps = {
  data: [],
  onLoadMore: () => {},
  onResetUserPassword: () => {},
  isLastPage: true,
  currentUserId: null,
  isAuth0Enabled: false,
  allUserRoles: ['SuperUser', 'CustomerIT'],
  FormModal: DefaultModal,
  loading: false,
};

export default Accounts;
