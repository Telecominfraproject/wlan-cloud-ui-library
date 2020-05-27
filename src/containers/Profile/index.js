import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button } from 'antd';
import { DeleteFilled, ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Profile = ({ data, onReload }) => {
  const history = useHistory();

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'TYPE',
      dataIndex: 'profileType',
      key: 'type',
      width: 250,
    },
    {
      title: 'ACCESS POINTS',
      dataIndex: '__typename',
      key: 'access',
      width: 700,
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

  const routePage = ({ name }) => {
    history.push('/profiledetails', { name });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TopSection}>
        <h1>Profiles</h1>
        <div className={styles.Buttons}>
          <Button
            className={styles.addAccount}
            type="primary"
            onClick={() => console.log('clicked')}
          >
            Add Profile
          </Button>
          <Button
            className={styles.reloadButton}
            type="primary"
            onClick={() => onReload()}
            icon={<ReloadOutlined />}
          />
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        onRow={row => {
          return {
            onClick: () => {
              routePage(row);
            },
          };
        }}
      />
    </div>
  );
};

Profile.propTypes = {
  data: PropTypes.instanceOf(Array),
  onReload: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  data: [],
};

export default Profile;
