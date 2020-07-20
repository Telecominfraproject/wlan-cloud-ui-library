import React, { useState } from 'react';
import { Table, Alert, Spin } from 'antd';
import moment from 'moment';
import { FormOutlined, DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import Header from 'components/Header';
import Button from 'components/Button';
import Modal from 'components/Modal';
import styles from './index.module.scss';
import AssignmentModal from './components/AssignmentModal';
import VersionModal from './components/VersionModal';

const Firmware = ({
  firmwareData,
  trackAssignmentData,
  onDeleteTrackAssignment,
  onDeleteFirmware,
  onCreateFirnware,
  onUpdateFirmware,
  firmwareError,
  firmwareLoading,
  trackAssignmentError,
  trackAssignmentLoading,
}) => {
  const [addAssignmentModal, setAddAssignmentModal] = useState(false);
  const [editAssignmentModal, setEditAssignmentModal] = useState(false);
  const [addVersionModal, setAddVersionModal] = useState(false);
  const [editVersionModal, setEditVersionModal] = useState(false);
  const [deleteAssignmentModal, setDeleteAssignmentModal] = useState(false);
  const [deleteVersionModal, setDeleteVersionModal] = useState(false);
  const [taskAssignmentValues, setTaskAssignmentValues] = useState({
    firmwareTrackId: 0,
    firmwareVersionId: 0,
  });
  const [firmwareValues, setFirmwareValues] = useState({});

  const deleteTrackAssignment = () => {
    const { firmwareTrackId, firmwareVersionId } = taskAssignmentValues;
    onDeleteTrackAssignment(firmwareTrackId, firmwareVersionId);
    setDeleteAssignmentModal(false);
  };
  const deleteFirmware = () => {
    const { id } = firmwareValues;
    onDeleteFirmware(id);
    setDeleteVersionModal(false);
  };
  const createFirmware = ({
    modelId,
    versionName,
    description,
    filename,
    commit,
    date,
    validationCode,
  }) => {
    onCreateFirnware(
      modelId,
      versionName,
      description,
      filename,
      commit,
      date ? date.valueOf().toString() : undefined,
      validationCode
    );
    setAddVersionModal(false);
  };

  const updateFirmware = ({
    modelId,
    versionName,
    description,
    filename,
    commit,
    date,
    validationCode,
  }) => {
    const { id, createdTimestamp, lastModifiedTimestamp } = firmwareValues;
    onUpdateFirmware(
      id,
      modelId,
      versionName,
      description,
      filename,
      commit,
      date ? date.valueOf().toString() : null,
      validationCode,
      createdTimestamp,
      lastModifiedTimestamp
    );
    setEditVersionModal(false);
  };

  const assignmentColumns = [
    {
      title: 'MODEL ID',
      dataIndex: 'modelId',
      key: 'modelId',
      width: 100,
    },
    {
      title: 'VERSION',
      dataIndex: 'firmwareVersionRecordId',
      key: 'version',
      render: firmwareRecordId => {
        const firmware = Object.values(firmwareData).find(i => i.id === firmwareRecordId);
        return firmware && firmware.versionName;
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'editAssignment',
      width: 60,
      render: (_, record) => (
        <Button
          title="editAssignment"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setTaskAssignmentValues({ ...record });
            setEditAssignmentModal(true);
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'deleteAssignment',
      width: 60,
      render: (_, record) => (
        <Button
          title="deleteAssignment"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            setTaskAssignmentValues({ ...record });
            setDeleteAssignmentModal(true);
          }}
        />
      ),
    },
  ];

  const versionColumn = [
    {
      title: 'MODEL ID',
      dataIndex: 'modelId',
      key: 'modelIdFirmware',
      width: 100,
    },
    {
      title: 'VERSION',
      dataIndex: 'versionName',
      key: 'versionFirmware',
      width: 225,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      width: 350,
    },
    {
      title: 'COMMIT',
      dataIndex: 'commit',
      key: 'commit',
      width: 100,
    },
    {
      title: 'RELEASE DATE',
      dataIndex: 'releaseDate',
      key: 'date',
      width: 180,
      render: time => moment(time, 'x').format('DD MMM YYYY, hh:mm a'),
    },
    {
      title: '',
      dataIndex: '',
      key: 'editFirmware',
      width: 60,
      render: (_, record) => (
        <Button
          title="editFirmware"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setFirmwareValues({ ...record });
            setEditVersionModal(true);
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'deleteFirmware',
      width: 60,
      render: (_, record) => (
        <Button
          title="deleteFirmware"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            setFirmwareValues({ ...record });
            setDeleteVersionModal(true);
          }}
        />
      ),
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
      />
      <VersionModal
        onCancel={() => setAddVersionModal(false)}
        visible={addVersionModal}
        onSubmit={createFirmware}
        title="Add Firmware Version"
      />
      <VersionModal
        onCancel={() => setEditVersionModal(false)}
        visible={editVersionModal}
        onSubmit={updateFirmware}
        title="Edit Firmware Version"
        {...firmwareValues}
      />
      <Modal
        onCancel={() => setDeleteAssignmentModal(false)}
        onSuccess={() => deleteTrackAssignment()}
        visible={deleteAssignmentModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the track assignment:{' '}
            <strong> {taskAssignmentValues.modelId} </strong>
          </p>
        }
      />
      <Modal
        onCancel={() => setDeleteVersionModal(false)}
        onSuccess={() => deleteFirmware()}
        visible={deleteVersionModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the version:{' '}
            <strong> {firmwareValues.versionName} </strong>
          </p>
        }
      />
      <Header>
        <h1>Track Assignments</h1>
        {!trackAssignmentLoading && Object.keys(trackAssignmentError).length === 0 && (
          <Button onClick={() => setAddAssignmentModal(true)}> Add Track Assignment</Button>
        )}
      </Header>
      {!trackAssignmentLoading && Object.keys(trackAssignmentError).length === 0 && (
        <Table
          rowKey="modelId"
          columns={assignmentColumns}
          dataSource={trackAssignmentData}
          pagination={false}
        />
      )}
      {trackAssignmentLoading && <Spin size="large" data-testid="trackAssignmentSpinner" />}
      {Object.keys(trackAssignmentError).length > 0 && (
        <Alert
          data-testid="trackAssignmentError"
          message="Error"
          description="Failed to load Firmware Track Assignment data."
          type="error"
          showIcon
        />
      )}
      <Header>
        <h1>Versions</h1>
        {!firmwareLoading && Object.keys(firmwareError).length === 0 && (
          <Button onClick={() => setAddVersionModal(true)}>Add Version</Button>
        )}
      </Header>
      {!firmwareLoading && Object.keys(firmwareError).length === 0 && (
        <Table rowKey="id" columns={versionColumn} dataSource={firmwareData} pagination={false} />
      )}
      {firmwareLoading && <Spin size="large" data-testid="firmwareSpinner" />}
      {Object.keys(firmwareError).length > 0 && (
        <Alert
          data-testid="firmwareError"
          message="Error"
          description="Failed to load Firmware Version data."
          type="error"
          showIcon
        />
      )}
    </Container>
  );
};

Firmware.propTypes = {
  firmwareData: PropTypes.instanceOf(Object),
  trackAssignmentData: PropTypes.instanceOf(Object),
  onDeleteTrackAssignment: PropTypes.func.isRequired,
  onDeleteFirmware: PropTypes.func.isRequired,
  onCreateFirnware: PropTypes.func.isRequired,
  onUpdateFirmware: PropTypes.func.isRequired,
  firmwareError: PropTypes.instanceOf(Object),
  firmwareLoading: PropTypes.bool,
  trackAssignmentError: PropTypes.instanceOf(Object),
  trackAssignmentLoading: PropTypes.bool,
};

Firmware.defaultProps = {
  firmwareData: {},
  trackAssignmentData: {},
  firmwareError: {},
  firmwareLoading: true,
  trackAssignmentError: {},
  trackAssignmentLoading: true,
};

export default Firmware;
