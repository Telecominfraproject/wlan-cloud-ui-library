import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Table } from 'components/Skeleton';

import DeleteButton from 'components/DeleteButton';
import Header from 'components/Header';
import ThemeContext from 'contexts/ThemeContext';

import WithRoles, { RoleProtectedBtn } from 'components/WithRoles';

import FormModal from './components/FormModal';
import styles from './index.module.scss';

const BlockedList = ({ data, onUpdateClient, onAddClient, loading, text }) => {
  const { routes } = useContext(ThemeContext);
  const [addModal, setAddModal] = useState(false);
  const [activeMac, setActiveMac] = useState({});

  const addClient = ({ macAddress }) => {
    onAddClient(macAddress);
    setAddModal(false);
  };

  const deleteClient = () => {
    const formattedDetails = { ...activeMac.details };

    onUpdateClient(activeMac.macAddress, {
      ...formattedDetails,
      ...(formattedDetails?.blockedListDetails
        ? {
            enabled: false,
          }
        : {}),
    });
  };

  const columns = [
    {
      title: text('MAC ADDRESS'),
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
            type="default"
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
    <>
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addClient}
        title={text('Add Client')}
        text={text}
      />
      <div className={styles.BlockedList}>
        <Header>
          <h1>{text('Client Blocked List')}</h1>

          <RoleProtectedBtn type="primary" onClick={() => setAddModal(true)}>
            {text('Add Client')}
          </RoleProtectedBtn>
        </Header>

        <Table
          loading={loading}
          scroll={{ x: 'max-content' }}
          rowKey="macAddress"
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </div>
    </>
  );
};

BlockedList.propTypes = {
  data: Proptypes.instanceOf(Array),
  onUpdateClient: Proptypes.func,
  onAddClient: Proptypes.func,
  loading: Proptypes.bool,
  text: Proptypes.func,
};

BlockedList.defaultProps = {
  data: [],
  onUpdateClient: () => {},
  onAddClient: () => {},
  loading: false,
  text: str => str,
};

export default BlockedList;
