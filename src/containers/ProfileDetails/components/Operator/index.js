import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Form, Button, Input } from 'antd';
import LocaleItem from 'components/LocaleItem';
import Modal from 'components/Modal';
import PasspointNameTable from 'components/PasspointNameTable';

import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const OperatorForm = ({ details, form }) => {
  const [operatorFriendlyName, setOperatorFriendlyName] = useState(
    [...details?.operatorFriendlyName] || []
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [nameForm] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      serverOnlyAuthenticatedL2EncryptionNetwork: details?.serverOnlyAuthenticatedL2EncryptionNetwork
        ? 'true'
        : 'false',
      operatorFriendlyName: operatorFriendlyName || [],
    });
  }, [form, details, operatorFriendlyName]);

  useEffect(() => {
    setOperatorFriendlyName(details?.operatorFriendlyName || []);
  }, [details?.operatorFriendlyName]);

  const addName = () => {
    nameForm.validateFields().then(values => {
      setOperatorFriendlyName([...operatorFriendlyName, values]);
      nameForm.resetFields();
      setModalVisible(false);
    });
  };

  const removeName = obj => {
    setOperatorFriendlyName([...operatorFriendlyName.filter(i => i.dupleName !== obj.dupleName)]);
  };

  const cancelModal = () => {
    nameForm.resetFields();
    setModalVisible(false);
  };

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
        <PasspointNameTable
          tableData={operatorFriendlyName}
          dataIndex="operatorFriendlyName"
          removeName={removeName}
        />
      </Card>

      <Item name="operatorFriendlyName" noStyle>
        <Modal
          onSuccess={addName}
          onCancel={cancelModal}
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
              <LocaleItem name="locale" />
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
