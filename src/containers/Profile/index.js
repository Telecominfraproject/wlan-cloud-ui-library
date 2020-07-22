import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { DeleteFilled, ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';

import styles from './index.module.scss';

const Profile = ({ data, onReload, onLoadMore, isLastPage, onDeleteProfile }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeProfile, setActiveProfile] = useState({
    id: 0,
    name: '',
    profileType: '',
    __typename: '',
  });

  const deleteProfile = () => {
    const { id } = activeProfile;
    onDeleteProfile(id);
    setDeleteModal(false);
  };

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
      render: (_, record) => {
        return record.profileType === 'ssid' || record.profileType === 'equipment_ap' ? (
          <Button
            title="delete"
            icon={<DeleteFilled />}
            onClick={() => {
              setDeleteModal(true);
              setActiveProfile({
                id: record.id,
                name: record.name,
                profileType: record.profileType,
                __typename: record.__typename,
              });
            }}
          />
        ) : null;
      },
    },
  ];

  return (
    <Container>
      <div className={styles.Profile}>
        <Modal
          onCancel={() => setDeleteModal(false)}
          onSuccess={deleteProfile}
          visible={deleteModal}
          title="Are you sure?"
          buttonText="Delete"
          buttonType="danger"
          content={
            <p>
              Are you sure you want to delete the account: <strong> {activeProfile.name}</strong>
            </p>
          }
        />
        <Header>
          <h1>Profiles</h1>
          <div className={styles.Buttons}>
            <Link to="/addprofile">
              <Button className={styles.AddProfile}> Add Profile </Button>
            </Link>
            <Button icon={<ReloadOutlined />} onClick={onReload} title="reload" />
          </div>
        </Header>
        <Table
          rowKey="id"
          className={styles.Profile}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        {!isLastPage && (
          <div className={styles.LoadMore}>
            <Button onClick={onLoadMore}>Load More</Button>
          </div>
        )}
      </div>
    </Container>
  );
};

Profile.propTypes = {
  data: PropTypes.instanceOf(Array),
  onDeleteProfile: PropTypes.func.isRequired,
  onReload: PropTypes.func,
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
};

Profile.defaultProps = {
  data: [],
  onReload: () => {},
  onLoadMore: () => {},
  isLastPage: true,
};

export default Profile;
