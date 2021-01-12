import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Cascader, Button, Table, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import _ from 'lodash';
import { authOptions } from './constants';

import styles from '../../../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const NaiRealm = ({ eapMap, form, addEap, removeEap }) => {
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
        return obj.map(i => <div key={i}>{i}</div>);
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

  const naiLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  };

  const formatRealmList = useMemo(() => {
    if (!eapMap || eapMap === undefined) {
      return [];
    }
    const formattedData = [];
    Object.keys(eapMap).forEach(i => {
      if (eapMap[i].length !== 0) {
        formattedData.push({
          method: i,
          authentication: eapMap[i],
        });
      }
    });

    return formattedData;
  }, [eapMap]);

  const addEapMethod = () => {
    form
      .validateFields()
      .then(values => {
        const i = _.cloneDeep(eapMap || {});
        if (!(values.method in i)) {
          i[values.method] = [];
        }
        i[values.method].push(values.auth.join(': '));
        addEap(i);

        form.resetFields();
        setEapModal(false);
      })
      .catch(() => {});
  };

  const canceledModal = () => {
    form.resetFields();
    setEapModal(false);
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
        extra={
          <Button onClick={() => setEapModal(true)} data-testid="addEapMethod">
            Add
          </Button>
        }
      >
        <Table
          dataSource={formatRealmList}
          columns={columnsNai}
          pagination={false}
          rowKey="method"
        />
      </Card>
      <Item name="eapMap" noStyle>
        <Modal
          onSuccess={addEapMethod}
          onCancel={canceledModal}
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
                <Select placeholder="Please select" data-testid="method">
                  <Option value="EAP-TLS with certificate" data-testid="eapCertificate">
                    EAP-TLS with certificate
                  </Option>
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
  eapMap: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
  addEap: PropTypes.func.isRequired,
  removeEap: PropTypes.func.isRequired,
};

NaiRealm.defaultProps = {
  eapMap: {},
  form: null,
};

export default NaiRealm;
