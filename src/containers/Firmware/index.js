import React, { useState, useMemo } from 'react';
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
  onCreateTrackAssignment,
  onUpdateTrackAssignment,
  onDeleteTrackAssignment,
  onDeleteFirmware,
  onCreateFirmware,
  onUpdateFirmware,
  firmwareError,
  firmwareLoading,
  trackAssignmentError,
  trackAssignmentLoading,
  firmwareTrackLoading,
  firmwareTrackError,
  firmwareModelData,
  handleSearchFirmware,
  firmwareVersionData,
  firmwareVersionLoading,
  firmwareModelError,
  firmwareModelLoading,
}) => {
  const [addAssignmentModal, setAddAssignmentModal] = useState(false);
  const [editAssignmentModal, setEditAssignmentModal] = useState(false);
  const [addVersionModal, setAddVersionModal] = useState(false);
  const [editVersionModal, setEditVersionModal] = useState(false);
  const [deleteAssignmentModal, setDeleteAssignmentModal] = useState(false);
  const [deleteVersionModal, setDeleteVersionModal] = useState(false);
  const [traskAssignmentValues, setTaskAssignmentValues] = useState({});
  const [firmwareValues, setFirmwareValues] = useState({});

  const filteredModels = useMemo(() => {
    const usedModels = Object.keys(trackAssignmentData).map(i => trackAssignmentData[i].modelId);
    return Object.values(firmwareModelData).filter(model => !usedModels.includes(model));
  }, [firmwareModelData, trackAssignmentData]);

  const createTrackAssignment = ({ firmwareVersionRecordId, modelId }) => {
    onCreateTrackAssignment(firmwareVersionRecordId, modelId);
    setAddAssignmentModal(false);
  };

  const createUpdateAssignment = ({ firmwareVersionRecordId, modelId }) => {
    const { createdTimestamp, lastModifiedTimestamp } = traskAssignmentValues;
    let prevFirmwareVersionRecordId = firmwareVersionRecordId;
    trackAssignmentData.forEach((element, index) => {
      if (element.modelId === modelId) {
        prevFirmwareVersionRecordId = trackAssignmentData[index].firmwareVersionRecordId;
      }
    });

    onUpdateTrackAssignment(
      firmwareVersionRecordId,
      modelId,
      createdTimestamp,
      lastModifiedTimestamp,
      prevFirmwareVersionRecordId
    );
    setEditAssignmentModal(false);
  };

  const deleteTrackAssignment = () => {
    const { trackRecordId, firmwareVersionRecordId } = traskAssignmentValues;
    onDeleteTrackAssignment(trackRecordId, firmwareVersionRecordId);
    setDeleteAssignmentModal(false);
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
    onCreateFirmware(
      modelId,
      versionName,
      description,
      filename,
      commit,
      date?.valueOf()?.toString(),
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
      date?.valueOf()?.toString(),
      validationCode,
      createdTimestamp,
      lastModifiedTimestamp
    );
    setEditVersionModal(false);
  };

  const deleteFirmware = () => {
    const { id } = firmwareValues;
    onDeleteFirmware(id);
    setDeleteVersionModal(false);
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
        return (firmware && firmware.versionName) || firmwareRecordId;
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'editAssignment',
      width: 60,
      render: (_, record) => (
        <Button
          title={`edit-track-${record.modelId}`}
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
          title={`delete-track-${record.modelId}`}
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
      render: time =>
        parseInt(time, 10) ? moment(time, 'x').format('DD MMM YYYY, hh:mm a') : null,
    },
    {
      title: '',
      dataIndex: '',
      key: 'editFirmware',
      width: 60,
      render: (_, record) => (
        <Button
          title={`edit-firmware-${record.modelId}`}
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
      render: (_, record) => {
        const found = Object.values(trackAssignmentData).some(
          i => Object.values(record).indexOf(i.firmwareVersionRecordId) > 0
        );
        return !found ? (
          <Button
            title={`delete-firmware-${record.modelId}`}
            className={styles.InfoButton}
            type="primary"
            icon={<DeleteFilled />}
            onClick={() => {
              setFirmwareValues({ ...record });
              setDeleteVersionModal(true);
            }}
          />
        ) : null;
      },
    },
  ];

  const trackAssignmentReady = !trackAssignmentLoading && !trackAssignmentError;
  const firmwareReady = !firmwareLoading && !firmwareError;

  return (
    <Container>
      <AssignmentModal
        onCancel={() => setAddAssignmentModal(false)}
        visible={addAssignmentModal}
        onSubmit={createTrackAssignment}
        title="Add Model Target Version"
        filteredModels={filteredModels}
        handleSearchFirmware={handleSearchFirmware}
        firmwareVersionData={firmwareVersionData}
        firmwareVersionLoading={firmwareVersionLoading}
        firmwareTrackError={firmwareTrackError}
        firmwareModelError={firmwareModelError}
        firmwareTrackLoading={firmwareTrackLoading}
        firmwareModelLoading={firmwareModelLoading}
      />
      <AssignmentModal
        onCancel={() => setEditAssignmentModal(false)}
        visible={editAssignmentModal}
        onSubmit={createUpdateAssignment}
        title="Edit Model Target Version"
        filteredModels={filteredModels}
        handleSearchFirmware={handleSearchFirmware}
        firmwareVersionData={firmwareVersionData}
        firmwareVersionLoading={firmwareVersionLoading}
        modelId={traskAssignmentValues.modelId}
        firmwareVersionRecordId={traskAssignmentValues.firmwareVersionRecordId}
        firmwareTrackError={firmwareTrackError}
        firmwareModelError={firmwareModelError}
        firmwareTrackLoading={firmwareTrackLoading}
        firmwareModelLoading={firmwareModelLoading}
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
        onSuccess={deleteTrackAssignment}
        visible={deleteAssignmentModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the model target version:{' '}
            <strong> {traskAssignmentValues.modelId} </strong>
          </p>
        }
      />
      <Modal
        onCancel={() => setDeleteVersionModal(false)}
        onSuccess={deleteFirmware}
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
        <h1>Model Target Version</h1>
        {trackAssignmentReady && (
          <Button onClick={() => setAddAssignmentModal(true)}> Add Model Target Version</Button>
        )}
      </Header>
      {trackAssignmentReady && (
        <Table
          rowKey="modelId"
          columns={assignmentColumns}
          dataSource={trackAssignmentData}
          pagination={false}
        />
      )}
      {trackAssignmentLoading && (
        <Spin className={styles.spinner} size="large" data-testid="trackAssignmentSpinner" />
      )}
      {trackAssignmentError && (
        <Alert
          data-testid="trackAssignmentError"
          message="Error"
          description="Failed to load Model Target Version data."
          type="error"
          showIcon
        />
      )}
      <Header>
        <h1>All Versions</h1>
        {firmwareReady && <Button onClick={() => setAddVersionModal(true)}>Add Version</Button>}
      </Header>
      {firmwareReady && (
        <Table rowKey="id" columns={versionColumn} dataSource={firmwareData} pagination={false} />
      )}
      {firmwareLoading && (
        <Spin className={styles.spinner} size="large" data-testid="firmwareSpinner" />
      )}
      {firmwareError && (
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
  firmwareData: PropTypes.instanceOf(Array),
  trackAssignmentData: PropTypes.instanceOf(Array),
  firmwareModelData: PropTypes.instanceOf(Array),
  firmwareVersionData: PropTypes.instanceOf(Array),
  trackAssignmentError: PropTypes.instanceOf(Object),
  firmwareTrackError: PropTypes.instanceOf(Object),
  firmwareModelError: PropTypes.instanceOf(Object),
  firmwareError: PropTypes.instanceOf(Object),
  onDeleteTrackAssignment: PropTypes.func.isRequired,
  onCreateTrackAssignment: PropTypes.func.isRequired,
  onUpdateTrackAssignment: PropTypes.func.isRequired,
  handleSearchFirmware: PropTypes.func.isRequired,
  onDeleteFirmware: PropTypes.func.isRequired,
  onCreateFirmware: PropTypes.func.isRequired,
  onUpdateFirmware: PropTypes.func.isRequired,
  firmwareLoading: PropTypes.bool,
  trackAssignmentLoading: PropTypes.bool,
  firmwareTrackLoading: PropTypes.bool,
  firmwareVersionLoading: PropTypes.bool,
  firmwareModelLoading: PropTypes.bool,
};

Firmware.defaultProps = {
  firmwareData: [],
  trackAssignmentData: [],
  firmwareError: null,
  trackAssignmentError: null,
  firmwareTrackError: null,
  firmwareModelData: [],
  firmwareVersionData: [],
  firmwareModelError: null,
  firmwareLoading: true,
  trackAssignmentLoading: true,
  firmwareTrackLoading: true,
  firmwareVersionLoading: true,
  firmwareModelLoading: false,
};

export default Firmware;
