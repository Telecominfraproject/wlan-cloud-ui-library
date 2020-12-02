import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Form, Button } from 'antd';
import PasspointNameTable from 'components/PasspointNameTable';
import FormModal from '../ProviderId/components/FormModal';

import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const OperatorForm = ({ details, form }) => {
  const [operatorFriendlyName, setOperatorFriendlyName] = useState(
    details?.operatorFriendlyName ? [...details?.operatorFriendlyName] : []
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

  const addName = values => {
    setOperatorFriendlyName([...operatorFriendlyName, values]);
  };

  const removeName = obj => {
    setOperatorFriendlyName([...operatorFriendlyName.filter(i => i !== obj)]);
  };

  const cancelModal = () => {
    nameForm.resetFields();
    setModalVisible(false);
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
        <FormModal
          title="Add Operator Name"
          fieldName="operatorFriendlyName"
          onSubmit={addName}
          visible={modalVisible}
          closeModal={cancelModal}
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
