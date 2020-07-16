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
  const [addAssignmentModal, setAddAssignmentModal] = useState(false);
  const [editAssignmentModal, setEditAssignmentModal] = useState(false);
  const [addVersionModal, setAddVersionModal] = useState(false);
  const [editVersionModal, setEditVersionModal] = useState(false);
  const [deleteAssignmentModal, setDeleteAssignmentModal] = useState(false);
  const [deleteVersionModal, setDeleteVersionModal] = useState(false);

  const assignmentColumns = [
    {
      title: 'MODEL ID',
      dataIndex: 'model',
      key: 'modelId',
      width: 100,
    },
    {
      title: 'VERSION',
      dataIndex: 'version',
      key: 'version',
      width: 790,
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
            setEditAssignmentModal(true);
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
            setDeleteAssignmentModal(true);
          }}
        />
      ),
    },
  ];

  const versionColumn = [
    {
      title: 'MODEL ID',
      dataIndex: 'model',
      key: 'modelId',
      width: 100,
    },
    {
      title: 'VERSION',
      dataIndex: 'version',
      key: 'version',
      width: 100,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      width: 375,
    },
    {
      title: 'COMMIT',
      dataIndex: 'commit',
      key: 'commit',
      width: 100,
    },
    {
      title: 'RELEASE DATE',
      dataIndex: 'date',
      key: 'date',
      width: 180,
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
            setEditVersionModal(true);
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
            setDeleteVersionModal(true);
          }}
        />
      ),
    },
  ];

  const propDataTrack = [
    {
      key: 1,
      version: 'AP20_8.0.5_b883',
      model: 'AP20',
    },
  ];
  const propDataVersion = [
    {
      key: 1,
      version: 'AP20_8.0.5_b883',
      model: 'AP20',
      date: '2019-05-17 01:07:04 PM',
      commit: '075667b1',
      description: 'WaveOS 8.0.5, built by: jenkins',
    },
  ];

  return (
    <Container>
      <AssignmentModal
        onCancel={() => setAddAssignmentModal(false)}
        visible={addAssignmentModal}
        onSubmit={() => {}}
        title="Add Track Assignment"
        firmwareData={firmwareData}
      />
      <AssignmentModal
        onCancel={() => setEditAssignmentModal(false)}
        visible={editAssignmentModal}
        onSubmit={() => {}}
        title="Edit Track Assignment"
        firmwareData={firmwareData}
        firmware=""
        model=""
      />
      <VersionModal
        onCancel={() => setAddVersionModal(false)}
        visible={addVersionModal}
        onSubmit={() => {}}
        title="Add Firmware Version"
      />
      <VersionModal
        onCancel={() => setEditVersionModal(false)}
        visible={editVersionModal}
        onSubmit={() => {}}
        title="Edit Firmware Version"
      />
      <Modal
        onCancel={() => setDeleteAssignmentModal(false)}
        onSuccess={() => {}}
        visible={deleteAssignmentModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={<p>Are you sure you want to delete the track assignment: </p>}
      />
      <Modal
        onCancel={() => setDeleteVersionModal(false)}
        onSuccess={() => {}}
        visible={deleteVersionModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={<p>Are you sure you want to delete the version: </p>}
      />
      <Header>
        <h1>Track Assignments</h1>
        <Button onClick={() => setAddAssignmentModal(true)}> Add Track Assignment</Button>
      </Header>
      <Table columns={assignmentColumns} dataSource={propDataTrack} pagination={false} />
      <Header>
        <h1>Versions</h1>
        <Button onClick={() => setAddVersionModal(true)}>Add Version</Button>
      </Header>
      <Table columns={versionColumn} dataSource={propDataVersion} pagination={false} />
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
