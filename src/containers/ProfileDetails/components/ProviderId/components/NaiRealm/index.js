import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Cascader, Table, Select as AntdSelect } from 'antd';
import { DeleteOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import { Select, Input, RoleProtectedBtn } from 'components/WithRoles';
import ContainedSelect from 'components/ContainedSelect';
import _ from 'lodash';
import { DOMAIN_REGEX } from 'containers/ProfileDetails/constants';
import { authOptions } from './constants';

import styles from '../../../index.module.scss';

const { Item } = Form;
const { Option } = AntdSelect;

const naiLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};

const NaiRealm = ({ eapMap, form, addEap, removeEap, addRealm }) => {
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
        <RoleProtectedBtn
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
      <Item label="Domain Name List">
        <Form.List name="naiRealms">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(field => (
                  <div key={field.name}>
                    <Item
                      name={field.name}
                      rules={[
                        {
                          required: true,
                          message: 'Domain Name is required',
                        },
                        {
                          pattern: DOMAIN_REGEX,
                          message: 'Enter a valid Domain Name',
                        },
                        () => ({
                          validator(_rule, value) {
                            return addRealm(value);
                          },
                        }),
                      ]}
                    >
                      <Input
                        placeholder={`Enter Domain Name ${field.name + 1}`}
                        addonAfter={
                          <MinusCircleOutlined
                            data-testid={`removeDomain${field.name}`}
                            onClick={() => remove(field.name)}
                          />
                        }
                      />
                    </Item>
                  </div>
                ))}
                <RoleProtectedBtn type="dashed" onClick={() => add()}>
                  <PlusOutlined /> Add Domain Name
                </RoleProtectedBtn>
              </>
            );
          }}
        </Form.List>
      </Item>

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
          <RoleProtectedBtn onClick={() => setEapModal(true)} data-testid="addEapMethod">
            Add
          </RoleProtectedBtn>
        }
      >
        <Table
          scroll={{ x: 'max-content' }}
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
                label="Method"
                rules={[
                  {
                    required: true,
                    message: 'Method field cannot be empty',
                  },
                ]}
              >
                <ContainedSelect placeholder="Please select" data-testid="method">
                  <Option value="EAP-TLS with certificate" data-testid="eapCertificate">
                    EAP-TLS with certificate
                  </Option>
                  <Option value="EAP-TTLS with username/password">
                    EAP-TTLS with username/password
                  </Option>
                  <Option value="EAP-MSCHAP-V2 with username/password">
                    EAP-MSCHAP-V2 with username/password
                  </Option>
                  <Option value="EAP-AKA Authentication">EAP-AKA Authentication</Option>
                  <Option value="EAP-AKA'">EAP-AKA Prime</Option>
                </ContainedSelect>
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
  addRealm: PropTypes.func.isRequired,
};

NaiRealm.defaultProps = { eapMap: {}, form: null };

export default NaiRealm;
