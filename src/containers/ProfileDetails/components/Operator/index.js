import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Form, Button } from 'antd';
import PasspointLocaleTable from 'components/PasspointLocaleTable';
import FormModal from '../ProviderId/components/FormModal';

import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const OperatorForm = ({ details, form }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [operatorFriendlyName, setOperatorFriendlyName] = useState(
    details?.operatorFriendlyName ?? []
  );

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
            <Option value="true">Enabled</Option>
            <Option value="false">Disabled</Option>
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
        <PasspointLocaleTable
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
