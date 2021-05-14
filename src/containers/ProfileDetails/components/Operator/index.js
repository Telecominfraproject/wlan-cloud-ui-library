import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Select as AntdSelect } from 'antd';
import PasspointLocaleTable from 'components/PasspointLocaleTable';
import { Select, Input, RoleProtectedBtn } from 'components/WithRoles';
import FormModal from '../ProviderId/components/FormModal';

import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = AntdSelect;

const OperatorForm = ({ details, form, handleOnFormChange }) => {
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
      domainNameList: details?.domainNameList?.join(', ') || '',
    });
  }, [form, details, operatorFriendlyName]);

  const addName = values => {
    setOperatorFriendlyName([...operatorFriendlyName, values]);
    handleOnFormChange();
  };

  const removeName = obj => {
    setOperatorFriendlyName([...operatorFriendlyName.filter(i => i !== obj)]);
    handleOnFormChange();
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
        <Item
          label="Domain Name List:"
          name="domainNameList"
          rules={[
            { required: true, message: 'Domain name list cannot be empty' },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (
                  !value ||
                  getFieldValue('domainNameList').match(
                    /^\s*([\w-]+(\.[\w-]+)+\s*,\s*)*[\w-]+(\.[\w-]+)+\s*$/g
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Please enter a comma separated list of domains'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter Domain Name List" />
        </Item>
      </Card>

      <Card
        title="Operator Name"
        extra={
          <RoleProtectedBtn type="solid" onClick={() => setModalVisible(true)}>
            Add Name
          </RoleProtectedBtn>
        }
      >
        <PasspointLocaleTable
          tableData={operatorFriendlyName}
          dataIndex="operatorFriendlyName"
          removeRow={removeName}
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
  handleOnFormChange: PropTypes.func,
};

OperatorForm.defaultProps = {
  form: null,
  details: {},
  handleOnFormChange: () => {},
};

export default OperatorForm;
