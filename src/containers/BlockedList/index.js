import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import FormModal from './components/FormModal';

import styles from './index.module.scss';

const BlockedList = ({ data, onUpdateClient }) => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeMac, setActiveMac] = useState({});

  const addClient = ({ macAddress }) => {
    const details = {
      blocklistDetails: { enabled: true },
      model_type: 'ClientInfoDetails',
    };
    onUpdateClient(macAddress, details);
    setAddModal(false);
  };

  const deleteClient = () => {
    const details = {
      blocklistDetails: { enabled: false },
      model_type: 'ClientInfoDetails',
    };
    onUpdateClient(activeMac.macAddress, details);
    setDeleteModal(false);
  };

  const columns = [
    {
      title: 'MAC ADDRESS',
      dataIndex: 'macAddress',
      key: 'mac',
      width: 900,
    },
    {
      title: '',
      dataIndex: '',
      key: 'deleteModel',
      width: 60,
      render: (_, record) => {
        return record.model !== 'default' ? (
          <Button
            title={`delete-mac-${record.macAddress}`}
            className={styles.InfoButton}
            type="danger"
            icon={<DeleteFilled />}
            onClick={() => {
              setActiveMac({ ...record });
              setDeleteModal(true);
            }}
          />
        ) : null;
      },
    },
  ];

  return (
    <Container>
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteClient}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the MAC Address:{' '}
            <strong> {activeMac.macAddress} </strong>
          </p>
        }
      />
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addClient}
        title="Add Blocklist"
      />
      <Header>
        <h1>Client Blocked List</h1>
        <Button type="primary" onClick={() => setAddModal(true)}>
          Add MAC
        </Button>
      </Header>

      <Table rowKey="macAddress" dataSource={data} columns={columns} pagination={false} />
    </Container>
  );
};

BlockedList.propTypes = {
  data: Proptypes.instanceOf(Array),
  onUpdateClient: Proptypes.func,
};

BlockedList.defaultProps = {
  data: [],
  onUpdateClient: () => {},
};

export default BlockedList;
