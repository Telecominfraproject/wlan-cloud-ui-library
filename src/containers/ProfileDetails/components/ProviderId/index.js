import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import OsuForm from './components/OsuForm';

import styles from '../index.module.scss';
import NaiRealm from './components/NaiRealm';

const { Item } = Form;

const ProviderIdForm = ({ form, details }) => {
  const [data, setData] = useState({ ...details });

  const [plmnModal, setPlmnModal] = useState(false);
  const [plmnForm] = Form.useForm();
  const [naiForm] = Form.useForm();
  const [osuForm] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      domainName: details.domainName || '',
      roamingOi: details.roamingOi.join(', ') || '',
      mccMncList: data.mccMncList || [],
      osuFriendlyName: data.osuFriendlyName || [],
      osuServerUri: data.osuServerUri || [],
      osuServiceDescription: data.osuServiceDescription || [],
      osuIconList: data.osuIconList || [],
      encoding: data?.naiRealmList[0]?.encoding || 0,
      eapMap: data?.naiRealmList[0]?.eapMap || {},
    });
  }, [form, details, data]);

  useEffect(() => {
    setData({ ...details });
  }, [details]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const columnsPlmn = [
    {
      title: 'MCC',
      dataIndex: 'mcc',
    },
    {
      title: 'MNC',
      dataIndex: 'mnc',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Network',
      dataIndex: 'network',
    },
    {
      title: '',
      width: 80,
      render: item => (
        <Button
          title="removePlmn"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            setData({
              ...data,
              mccMncList: data.mccMncList.filter(i => i !== item),
            });
          }}
        />
      ),
    },
  ];

  const handleAddOsuItem = (dataIndex, obj) => {
    setData({
      ...data,
      [dataIndex]: [...data[dataIndex], obj],
    });
  };

  const handleRemoveOsuItem = (dataIndex, obj) => {
    setData({
      ...data,
      [dataIndex]: data[dataIndex].filter(i => i !== obj),
    });
  };

  const handleAddEapMethod = obj => {
    setData({
      ...data,
      naiRealmList: [
        {
          ...data.naiRealmList[0],
          eapMap: obj,
        },
      ],
    });
  };

  const handleRemoveEapMethod = obj => {
    const field = obj.method;
    const cloneEap = { ...data.naiRealmList[0].eapMap };
    cloneEap[field] = [];

    setData({
      ...data,
      naiRealmList: [
        {
          ...data.naiRealmList[0],
          eapMap: cloneEap,
        },
      ],
    });
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="Network Identifier">
        <Item
          label="Domain Name:"
          name="domainName"
          rules={[
            {
              required: true,
              message: 'Please enter a domain name',
            },
          ]}
        >
          <Input placeholder="Enter a domain name" />
        </Item>
        <Item
          label="Roaming OI:"
          name="roamingOi"
          rules={[
            {
              required: true,
              message: 'Roaming oi field cannot be empty',
            },
          ]}
        >
          <Input placeholder="Enter roaming oi" />
        </Item>
      </Card>

      <Card
        title="Public Land Mobile Networks (PLMN)"
        extra={
          <Button
            type="solid"
            onClick={() => {
              setPlmnModal(true);
            }}
          >
            Add
          </Button>
        }
      >
        <Table
          dataSource={data?.mccMncList}
          columns={columnsPlmn}
          pagination={false}
          rowKey={data?.mccMncList}
        />
        <Item name="mccMncList" style={{ height: '0' }}>
          <Modal
            visible={plmnModal}
            onSuccess={() => {
              plmnForm.validateFields().then(values => {
                setData({
                  ...data,
                  mccMncList: [...data.mccMncList, values],
                });
                setPlmnModal(false);
                plmnForm.resetFields();
              });
            }}
            onCancel={() => {
              setPlmnModal(false);
              plmnForm.resetFields();
            }}
            title="Add Public Land Mobile Network (PLMN)"
            content={
              <Form {...layout} form={plmnForm}>
                <Item
                  name="mcc"
                  label="Mcc:"
                  rules={[
                    {
                      required: true,
                      message: 'Mcc field cannot be empty',
                    },
                  ]}
                >
                  <Input placeholder="Enter a value for mcc" type="number" />
                </Item>
                <Item
                  name="mnc"
                  label="Mnc:"
                  rules={[
                    {
                      required: true,
                      message: 'Mnc field cannot be empty',
                    },
                  ]}
                >
                  <Input placeholder="Enter a value for mnc" type="number" />
                </Item>
                <Item
                  name="country"
                  label="Country:"
                  rules={[
                    {
                      required: true,
                      message: 'Country field cannot be empty',
                    },
                  ]}
                >
                  <Input placeholder="Enter a value for country" />
                </Item>
                <Item
                  name="network"
                  label="Network:"
                  rules={[
                    {
                      required: true,
                      message: 'Network field cannot be empty',
                    },
                  ]}
                >
                  <Input placeholder="Enter a value for network" />
                </Item>
              </Form>
            }
          />
        </Item>
      </Card>

      <NaiRealm
        data={data}
        form={naiForm}
        addEap={handleAddEapMethod}
        removeEap={handleRemoveEapMethod}
      />

      <OsuForm
        data={data}
        osuForm={osuForm}
        layout={layout}
        onSubmit={handleAddOsuItem}
        removeItem={handleRemoveOsuItem}
      />
    </div>
  );
};

ProviderIdForm.propTypes = {
  details: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
};

ProviderIdForm.defaultProps = {
  form: null,
  details: {},
};

export default ProviderIdForm;
