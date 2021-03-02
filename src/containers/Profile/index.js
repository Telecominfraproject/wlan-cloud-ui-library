import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Table } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';
import Container from 'components/Container';
import Header from 'components/Header';
import ThemeContext from 'contexts/ThemeContext';

import styles from './index.module.scss';

const Profile = ({ data, onReload, onLoadMore, isLastPage, onDeleteProfile }) => {
  const { routes } = useContext(ThemeContext);
  const history = useHistory();
  const [activeProfile, setActiveProfile] = useState({});

  const deleteProfile = () => {
    const { id } = activeProfile;
    onDeleteProfile(id);
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
      width: 80,
      render: (_, record) => (
        <DeleteButton
          className={styles.InfoButton}
          title={`delete-${record.name}`}
          extraOnClick={() => {
            setActiveProfile({
              ...record,
            });
          }}
          onSuccess={deleteProfile}
          content={
            <p>
              Are you sure you want to delete the profile: <strong> {activeProfile.name}</strong>?
            </p>
          }
        />
      ),
    },
  ];

  return (
    <Container>
      <div className={styles.Profile}>
        <Header>
          <h1>Profiles</h1>
          <div className={styles.Buttons}>
            <Link to={routes.addprofile}>
              <Button icon={<PlusOutlined />} className={styles.AddProfile}>
                Add Profile
              </Button>
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
                history.push(`${routes.profiles}/${record.id}`);
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
