import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import OsuForm from './components/OsuForm';
// import _ from 'lodash';

import styles from '../index.module.scss';

const { Item } = Form;

const ProviderIdForm = ({ form, details }) => {
  const [data, setData] = useState({ ...details });

  const [plmnModal, setPlmnModal] = useState(false);
  const [plmnForm] = Form.useForm();

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

  const handleSubmitForm = (dataIndex, values) => {
    if (dataIndex === 'osuFriendlyName') {
      setData({
        ...data,
        osuFriendlyName: [...data.osuFriendlyName, values],
      });
    }
    if (dataIndex === 'osuServiceDescription') {
      setData({
        ...data,
        osuServiceDescription: [...data.osuServiceDescription, values],
      });
    }
    if (dataIndex === 'osuIconList') {
      setData({
        ...data,
        osuIconList: [...data.osuIconList, values],
      });
    }
  };

  const handleRemoveItem = item => {
    if (data.osuFriendlyName.includes(item)) {
      setData({
        ...data,
        osuFriendlyName: data.osuFriendlyName.filter(i => i !== item),
      });
    }

    if (data.osuServiceDescription.includes(item)) {
      setData({
        ...data,
        osuServiceDescription: data.osuServiceDescription.filter(i => i !== item),
      });
    }

    if (data.osuIconList.includes(item)) {
      setData({
        ...data,
        osuIconList: data.osuIconList.filter(i => i !== item),
      });
    }
  };
  // const renderTable = (arr, columns) => {
  //   return <Table dataSource={arr} columns={columns} pagination={false} />;
  // };

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
              message: 'Please enter roaming oi',
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
      </Card>

      <OsuForm
        data={data}
        osuForm={osuForm}
        layout={layout}
        onSubmit={handleSubmitForm}
        removeItem={handleRemoveItem}
      />

      <Item name="mccMncList">
        <Modal
          visible={plmnModal}
          onSuccess={() => {
            plmnForm.validateFields().then(values => {
              setData({
                ...data,
                mccMncList: [...data.mccMncList, values],
              });
              setPlmnModal(false);
            });
          }}
          onCancel={() => setPlmnModal(false)}
          title="Add Public Land Mobile Network (PLMN)"
          content={
            <Form {...layout} form={plmnForm}>
              <Item
                name="mcc"
                label="Mcc:"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a value for mcc',
                  },
                ]}
              >
                <Input placeholder="Enter a value for mcc" />
              </Item>
              <Item
                name="mnc"
                label="Mnc:"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a value for mnc',
                  },
                ]}
              >
                <Input placeholder="Enter a value for mnc" />
              </Item>
              <Item
                name="country"
                label="Country:"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a country',
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
                    message: 'Please enter a network',
                  },
                ]}
              >
                <Input placeholder="Enter a value for network" />
              </Item>
            </Form>
          }
        />
      </Item>
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
