import React, { useState } from 'react';
import { Table } from 'antd';
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

  const [firmwareValues, setFirmwareValues] = useState({
    id: 0,
    modelId: 0,
    versionName: '',
    description: '',
    commit: '',
    releaseDate: 0,
    filename: '',
  });

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
        return firmware.versionName;
      },
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
            setTaskAssignmentValues({
              firmwareTrackId: record.trackRecordId,
              firmwareVersionId: record.firmwareVersionRecordId,
              name: record.modelId,
            });
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
            setTaskAssignmentValues({
              firmwareTrackId: record.trackRecordId,
              firmwareVersionId: record.firmwareVersionRecordId,
              name: record.modelId,
            });
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
      render: time => {
        const date = moment(time, 'x').format('DD MMM YYYY, hh:mm a');
        return date;
      },
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'editFirmware',
      width: 60,
      render: (_, record) => (
        <Button
          title="edit"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setFirmwareValues({
              id: record.id,
              modelId: record.modelId,
              versionName: record.versionName,
              description: record.description,
              commit: record.commit,
              releaseDate: record.releaseDate,
              filename: record.filename,
            });
            setEditVersionModal(true);
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'deleteFirmware',
      width: 60,
      render: (_, record) => (
        <Button
          title="delete"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            setFirmwareValues({
              id: record.id,
              modelId: record.modelId,
              versionName: record.versionName,
              description: record.description,
              commit: record.commit,
              releaseDate: record.releaseDate,
              filename: record.filename,
            });
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
        modelId={firmwareValues.modelId}
        versionName={firmwareValues.versionName}
        description={firmwareValues.description}
        commit={firmwareValues.commit}
        releaseDate={firmwareValues.releaseDate}
        filename={firmwareValues.filename}
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
            <strong> {taskAssignmentValues.name} </strong>
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
        <Button onClick={() => setAddAssignmentModal(true)}> Add Track Assignment</Button>
      </Header>
      <Table
        rowKey="id"
        columns={assignmentColumns}
        dataSource={trackAssignmentData}
        pagination={false}
      />
      <Header>
        <h1>Versions</h1>
        <Button onClick={() => setAddVersionModal(true)}>Add Version</Button>
      </Header>
      <Table rowKey="id" columns={versionColumn} dataSource={firmwareData} pagination={false} />
    </Container>
  );
};

Firmware.propTypes = {
  firmwareData: PropTypes.instanceOf(Object),
  trackAssignmentData: PropTypes.instanceOf(Object),
  onDeleteTrackAssignment: PropTypes.func.isRequired,
  onDeleteFirmware: PropTypes.func.isRequired,
};

Firmware.defaultProps = {
  firmwareData: {},
  trackAssignmentData: {},
};

export default Firmware;
