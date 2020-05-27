import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ReloadButton from 'components/ReloadButton';
import HeaderButton from 'components/HeaderButton';
import ContainerDiv from 'components/ContainerDiv';
import HeaderDiv from 'components/HeaderDiv';

import styles from './index.module.scss';

const Profile = ({ data, onReload }) => {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (_, record) => <Link to={`/profiles/${record.id}`}>{record.name}</Link>,
    },
    {
      title: 'TYPE',
      dataIndex: 'profileType',
      key: 'type',
      width: 250,
      render: (_, record) => <Link to={`/profiles/${record.id}`}>{record.profileType}</Link>,
    },
    {
      title: 'ACCESS POINTS',
      dataIndex: '__typename',
      key: 'access',
      width: 700,
      render: (_, record) => <Link to={`/profiles/${record.id}`}>{record.__typename}</Link>,
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: 80,
      render: (_, record) => (
        <Button
          title="edit"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => console.log(record)}
        />
      ),
    },
  ];

  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1>Profiles</h1>
        <div className={styles.Buttons}>
          <HeaderButton title="Add Account" onClick={() => {}} />
          <ReloadButton onReload={onReload} />
        </div>
      </HeaderDiv>
      <Table dataSource={data} columns={columns} />
    </ContainerDiv>
  );
};

Profile.propTypes = {
  data: PropTypes.instanceOf(Array),
  onReload: PropTypes.func,
};

Profile.defaultProps = {
  data: [],
  onReload: () => {},
};

export default Profile;
