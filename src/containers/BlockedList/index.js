import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import FormModal from './components/FormModal';

import styles from './index.module.scss';

const BlockedList = ({ data, onUpdateClient, onAddClient }) => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeMac, setActiveMac] = useState({});

  const addClient = ({ macAddress }) => {
    onAddClient(macAddress);
    setAddModal(false);
  };

  const deleteClient = () => {
    const formattedDetails = { ...activeMac.details };

    if (!formattedDetails?.blocklistDetails) {
      formattedDetails.blocklistDetails = {};
    }
    formattedDetails.blocklistDetails.enabled = false;
    onUpdateClient(activeMac.macAddress, formattedDetails);

    setDeleteModal(false);
  };

  const columns = [
    {
      title: 'MAC ADDRESS',
      dataIndex: 'macAddress',
      width: 900,
      render: value => (
        <Link className={styles.Link} to={`/network/client-devices/${value}`}>
          {value}
        </Link>
      ),
    },
    {
      key: 'deleteMac',
      width: 60,
      render: (_, record) => (
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
      ),
    },
  ];

  return (
    <Container>
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteClient}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Remove"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to remove the Client: <strong> {activeMac.macAddress} </strong>
            from the Blocked List?
          </p>
        }
      />
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addClient}
        title="Add Client"
      />
      <div className={styles.BlockedList}>
        <Header>
          <h1>Client Blocked List</h1>
          <Button type="primary" onClick={() => setAddModal(true)}>
            Add Client
          </Button>
        </Header>

        <Table rowKey="macAddress" dataSource={data} columns={columns} pagination={false} />
      </div>
    </Container>
  );
};

BlockedList.propTypes = {
  data: Proptypes.instanceOf(Array),
  onUpdateClient: Proptypes.func,
  onAddClient: Proptypes.func,
};

BlockedList.defaultProps = {
  data: [],
  onUpdateClient: () => {},
  onAddClient: () => {},
};

export default BlockedList;
