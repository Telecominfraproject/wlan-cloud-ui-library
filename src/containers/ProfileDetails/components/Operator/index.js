import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Select as AntdSelect } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import PasspointLocaleTable from 'components/PasspointLocaleTable';
import { Select, Input, RoleProtectedBtn } from 'components/WithRoles';
import { DOMAIN_REGEX } from 'containers/ProfileDetails/constants';
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
      domainNameList: details?.domainNameList || [''],
    });
  }, [form, details]);

  useEffect(() => {
    form.setFieldsValue({
      operatorFriendlyName: operatorFriendlyName || [],
    });
  }, [operatorFriendlyName]);

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

        <Item label="Domain Name List">
          <Form.List name="domainNameList">
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
                              const domains = fields.map(item =>
                                form.getFieldValue(['domainNameList', item.name])
                              );

                              const occurence = domains.filter(item => item === value).length;

                              if (!value || occurence <= 1) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Enter a unique Domain Name'));
                            },
                          }),
                        ]}
                      >
                        <Input
                          placeholder={`Enter Domain Name ${field.name + 1}`}
                          addonAfter={
                            fields.length > 1 && (
                              <MinusCircleOutlined
                                data-testid={`removeDomain${field.name}`}
                                onClick={() => remove(field.name)}
                              />
                            )
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
