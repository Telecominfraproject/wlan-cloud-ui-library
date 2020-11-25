import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Cascader, Button, Table, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import _ from 'lodash';

import styles from '../../../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const NaiRealm = ({ data, form, addEap, removeEap }) => {
  const [eapModal, setEapModal] = useState(false);

  const columnsNai = [
    {
      title: 'Method',
      dataIndex: ['method'],
      width: 500,
    },
    {
      title: 'Authentication',
      dataIndex: ['authentication'],
      render: obj => {
        return obj.map(i => (
          <Fragment key={i}>
            {i}
            <br />
          </Fragment>
        ));
      },
    },
    {
      title: '',
      width: 80,
      render: item => (
        <Button
          title="removeEapMethod"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            removeEap(item);
          }}
        />
      ),
    },
  ];

  const credType = [
    {
      value: 'SIM',
      label: 'SIM',
    },
    {
      value: 'USIM',
      label: 'USIM',
    },
    {
      value: 'NFC Secure Element',
      label: 'NFC Secure Element',
    },
    {
      value: 'Hardware Token',
      label: 'Hardware Token',
    },
    {
      value: 'Softoken',
      label: 'Softoken',
    },
    {
      value: 'Certificate',
      label: 'Certificate',
    },
    {
      value: 'username/password',
      label: 'username/password',
    },
    {
      value: 'none (server-side authentication only)',
      label: 'none (server-side authentication only)',
    },
    {
      value: 'Anonymous',
      label: 'Anonymous',
    },
    {
      value: 'Vendor Specific',
      label: 'Vendor Specific',
    },
  ];

  const nonEapCredType = [
    {
      value: 'PAP',
      label: 'PAP',
    },
    {
      value: 'CHAP',
      label: 'CHAP',
    },
    {
      value: 'MSCHAP',
      label: 'MSCHAP',
    },
    {
      value: 'MSCHAPV2',
      label: 'MSCHAPV2',
    },
  ];

  const authOptions = [
    {
      value: 'Expanded EAP Method',
      label: 'Expanded EAP Method',
      children: credType,
    },
    {
      value: 'Non-EAP Inner Authentication Type',
      label: 'Non-EAP Inner Authentication Type',
      children: nonEapCredType,
    },
    {
      value: 'Inner Authentication EAP Method Type',
      label: 'Inner Authentication EAP Method Type',
      children: credType,
    },
    {
      value: 'Expanded Inner EAP Method',
      label: 'Expanded Inner EAP Method',
      children: credType,
    },
    {
      value: 'Credential Type',
      label: 'Credential Type',
      children: credType,
    },
    {
      value: 'Tunneled EAP Method Credential Type',
      label: 'Tunneled EAP Method Credential Type',
      children: credType,
    },
    {
      value: 'Nai Realm EAP Auth Vendor Specific',
      label: 'Nai Realm EAP Auth Vendor Specific',
      children: credType,
    },
  ];

  const naiLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  };

  const formatRealmList = list => {
    if (!list || list === undefined) {
      return [];
    }

    const formattedData = [];
    Object.keys(list).forEach(i => {
      if (list[i].length !== 0) {
        formattedData.push({
          method: i,
          authentication: list[i],
        });
      }
    });

    return formattedData;
  };

  return (
    <Card title="Network Access Identifier (NAI) Realm">
      <Item
        name="encoding"
        label="Encoding:"
        rules={[
          {
            required: true,
            message: 'Encoding field cannot be empty',
          },
        ]}
      >
        <Select>
          <Option value={0}>Realm formatted in accordance with IETF RFC 4282</Option>
          <Option value={1}>Realm formatted in accordance with UTF8 NON IETF RFC 4282</Option>
        </Select>
      </Item>

      <Card
        title="Extensible Authentication (EAP) Methods:"
        bordered={false}
        extra={<Button onClick={() => setEapModal(true)}>Add</Button>}
      >
        <Table
          dataSource={formatRealmList(data?.naiRealmList[0]?.eapMap)}
          columns={columnsNai}
          pagination={false}
          rowKey={data?.naiRealmList}
        />
      </Card>
      <Item name="eapMap" style={{ height: '0' }}>
        <Modal
          onSuccess={() => {
            form.validateFields().then(values => {
              const i = _.cloneDeep(data.naiRealmList[0].eapMap);

              if (!(values.method in i)) {
                i[values.method] = [];
              }

              i[values.method].push(values.auth.join(': '));
              addEap(i);
              form.resetFields();
              setEapModal(false);
            });
          }}
          onCancel={() => {
            form.resetFields();
            setEapModal(false);
          }}
          visible={eapModal}
          title="Add EAP Method"
          content={
            <Form {...naiLayout} form={form}>
              <Item
                name="method"
                label="Method:"
                rules={[
                  {
                    required: true,
                    message: 'Method field cannot be empty',
                  },
                ]}
              >
                <Select placeholder="Please select">
                  <Option value="EAP-TLS with certificate">EAP-TLS with certificate</Option>
                  <Option value="EAP-TTLS with username/password">
                    EAP-TTLS with username/password
                  </Option>
                  <Option value="EAP-MSCHAP-V2 with username/password">
                    EAP-MSCHAP-V2 with username/password
                  </Option>
                </Select>
              </Item>
              <Item
                name="auth"
                label="Authentication"
                rules={[
                  {
                    required: true,
                    message: 'Authentication field cannot be empty',
                  },
                ]}
              >
                <Cascader options={authOptions} />
              </Item>
            </Form>
          }
        />
      </Item>
    </Card>
  );
};

NaiRealm.propTypes = {
  data: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
  addEap: PropTypes.func.isRequired,
  removeEap: PropTypes.func.isRequired,
};

NaiRealm.defaultProps = {
  data: {},
  form: null,
};

export default NaiRealm;
