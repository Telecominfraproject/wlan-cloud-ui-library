import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Form, Button, Table, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const OperatorForm = ({ details, form }) => {
  const [data, setData] = useState({ ...details });

  const [modalVisible, setModalVisible] = useState(false);
  const [nameForm] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      serverOnlyAuthenticatedL2EncryptionNetwork: details.serverOnlyAuthenticatedL2EncryptionNetwork
        ? 'true'
        : 'false',
      operatorFriendlyName: data.operatorFriendlyName || [],
    });
  }, [form, details, data]);

  useEffect(() => {
    setData({ ...details });
  }, [details]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'dupleName',
      width: 500,
    },
    {
      title: 'Locale',
      dataIndex: 'locale',
    },
    {
      title: '',
      width: 80,
      render: item => (
        <Button
          title="removeName"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            setData({
              ...data,
              operatorFriendlyName: data.operatorFriendlyName.filter(i => i !== item),
            });
          }}
        />
      ),
    },
  ];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="Security">
        <Item
          label="OSEN:"
          name="serverOnlyAuthenticatedL2EncryptionNetwork"
          rules={[
            {
              required: true,
              message: 'OSEN field cannot be empty',
            },
          ]}
        >
          <Select>
            <Option value="true">enabled</Option>
            <Option value="false">disabled</Option>
          </Select>
        </Item>
      </Card>

      <Card
        title="Operator Name"
        extra={
          <Button type="solid" onClick={() => setModalVisible(true)}>
            Add Name
          </Button>
        }
      >
        <Table
          dataSource={data?.operatorFriendlyName}
          columns={columns}
          pagination={false}
          rowKey={data?.operatorFriendlyName}
        />
      </Card>

      <Item name="operatorFriendlyName" style={{ height: '0' }}>
        <Modal
          onSuccess={() => {
            nameForm.validateFields().then(values => {
              setData({
                ...data,
                operatorFriendlyName: [...data.operatorFriendlyName, values],
              });
              nameForm.resetFields();
              setModalVisible(false);
            });
          }}
          onCancel={() => setModalVisible(false)}
          title="Add Operator Name"
          visible={modalVisible}
          content={
            <Form {...layout} form={nameForm}>
              <Item
                name="dupleName"
                label="Name:"
                rules={[
                  {
                    required: true,
                    message: 'Name field cannot be empty',
                  },
                ]}
              >
                <Input placeholder="Enter a value for name" />
              </Item>

              <Item
                name="locale"
                label="Locale:"
                rules={[
                  {
                    required: true,
                    message: 'Locale field cannot be empty',
                  },
                ]}
              >
                <Select placeholder="Please select">
                  <Option value="en_CA">English</Option>
                  <Option value="fr_CA">Francais</Option>
                </Select>
              </Item>
            </Form>
          }
        />
      </Item>
    </div>
  );
};

OperatorForm.propTypes = {
  details: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
};

OperatorForm.defaultProps = {
  form: null,
  details: {},
};

export default OperatorForm;
