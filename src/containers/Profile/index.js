import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Table } from 'antd';
import { DeleteFilled, ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';

import styles from './index.module.scss';

const Profile = ({ data, onReload, onLoadMore, isLastPage, onDeleteProfile }) => {
  const history = useHistory();
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
      width: 250,
    },
    {
      title: 'TYPE',
      dataIndex: 'profileType',
      width: 250,
    },
    {
      title: 'ACCESS POINTS',
      dataIndex: 'equipmentCount',
      width: 700,
    },
    {
      title: '',
      dataIndex: 'delete',
      width: 80,
      render: (_, record) => {
        return record.profileType === 'ssid' ||
          record.profileType === 'equipment_ap' ||
          record.profileType === 'bonjour' ||
          record.profileType === 'captive_portal' ? (
          <Button
            title={`delete-${record.name}`}
            className={styles.InfoButton}
            icon={<DeleteFilled />}
            onClick={e => {
              e.stopPropagation();
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
              Are you sure you want to delete the profile: <strong> {activeProfile.name}</strong>
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
          rowClassName={styles.Row}
          rowKey="id"
          className={styles.Profile}
          dataSource={data}
          columns={columns}
          pagination={false}
          onRow={record => {
            return {
              onClick: () => {
                history.push(`/profiles/${record.id}`);
              },
            };
          }}
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
  onDeleteProfile: PropTypes.func,
  onReload: PropTypes.func,
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
};

Profile.defaultProps = {
  data: [],
  onReload: () => {},
  onLoadMore: () => {},
  onDeleteProfile: () => {},
  isLastPage: true,
};

export default Profile;
