import React, { useState } from 'react';
import { Table } from 'antd';
import { FormOutlined, DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import Header from 'components/Header';
import Button from 'components/Button';
import Modal from 'components/Modal';
import styles from './index.module.scss';
import AssignmentModal from './components/AssignmentModal';
import VersionModal from './components/VersionModal';

const Firmware = ({ firmwareData }) => {
  const assignmentColumns = [
    {
      title: 'MODEL ID',
      dataIndex: '',
      key: 'modelId',
      width: 50,
    },
    {
      title: 'VERSION',
      dataIndex: '',
      key: 'version',
      width: 775,
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      width: 60,
      render: (_, record) => (
        <Button
          title="edit"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            console.log(record);
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: 60,
      render: (_, record) => (
        <Button
          title="delete"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            console.log(record);
          }}
        />
      ),
    },
  ];

  const versionColumn = [
    {
      title: 'MODEL ID',
      dataIndex: '',
      key: 'modelId',
      width: 50,
    },
    {
      title: 'VERSION',
      dataIndex: '',
      key: 'version',
      width: 100,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: '',
      key: 'description',
      width: 450,
    },
    {
      title: 'COMMIT',
      dataIndex: '',
      key: 'commit',
      width: 100,
    },
    {
      title: 'RELEASE DATE',
      dataIndex: '',
      key: 'date',
      width: 135,
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      width: 60,
      render: (_, record) => (
        <Button
          title="edit"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            console.log(record);
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: 60,
      render: (_, record) => (
        <Button
          title="delete"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            console.log(record);
          }}
        />
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <h1>Track Assignments</h1>
        <Button>Add Track Assignment</Button>
      </Header>
      <Table columns={assignmentColumns} pagination={false} />
      <Header>
        <h1>Versions</h1>
        <Button>Add Version</Button>
      </Header>
      <Table columns={versionColumn} pagination={false} />
    </Container>
  );
};

Firmware.propTypes = {
  firmwareData: PropTypes.instanceOf(Object),
};

Firmware.defaultProps = {
  firmwareData: {},
};

export default Firmware;
