import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Table } from 'antd';

import DeleteButton from 'components/DeleteButton';
import Container from 'components/Container';
import Header from 'components/Header';
import ThemeContext from 'contexts/ThemeContext';

import WithRoles, { RoleProtectedBtn } from 'components/WithRoles';

import FormModal from './components/FormModal';
import styles from './index.module.scss';

const BlockedList = ({ data, onUpdateClient, onAddClient }) => {
  const { routes } = useContext(ThemeContext);
  const [addModal, setAddModal] = useState(false);
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
  };

  const columns = [
    {
      title: 'MAC ADDRESS',
      dataIndex: 'macAddress',
      width: 900,
      render: value => (
        <Link className={styles.Link} to={`${routes.clientDevices}/${value}`}>
          {value}
        </Link>
      ),
    },
    {
      key: 'deleteMac',
      width: 60,
      render: (_, record) => (
        <WithRoles>
          <DeleteButton
            className={styles.InfoButton}
            title={`delete-mac-${record.macAddress}`}
            extraOnClick={() => {
              setActiveMac({ ...record });
            }}
            onSuccess={deleteClient}
            content={
              <p>
                Are you sure you want to remove the Client: <strong>{activeMac.macAddress} </strong>
                from the Blocked List?
              </p>
            }
            modalButtonText="Remove"
          />
        </WithRoles>
      ),
    },
  ];

  return (
    <Container>
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addClient}
        title="Add Client"
      />
      <div className={styles.BlockedList}>
        <Header>
          <h1>Client Blocked List</h1>

          <RoleProtectedBtn type="primary" onClick={() => setAddModal(true)}>
            Add Client
          </RoleProtectedBtn>
        </Header>

        <Table
          scroll={{ x: 'max-content' }}
          rowKey="macAddress"
          dataSource={data}
          columns={columns}
          pagination={false}
        />
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
