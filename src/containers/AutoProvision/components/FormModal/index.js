import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Alert, Spin } from 'antd';

import Modal from 'components/Modal';
import globalStyles from 'styles/index.scss';
import styles from '../../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const FormModal = ({
  onCancel,
  onSubmit,
  visible,
  title,
  profiles,
  loadingProfile,
  errorProfile,
  model,
  profileId,
  usedModels,
}) => {
  const [form] = Form.useForm();

  const filteredModels = usedModels.filter(value => value !== model);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  useEffect(() => {
    form.setFieldsValue({
      modelId: model,
      profileId: profileId ? profileId.toString() : null,
    });
  }, [visible]);

  const content = (
    <Form {...layout} form={form}>
      <Item
        label="Model ID"
        name="modelId"
        rules={[
          {
            required: true,
            message: 'Please enter Model Identification',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || filteredModels.indexOf(getFieldValue('modelId')) === -1) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Model identification already used. Please choose a new identification.')
              );
            },
          }),
        ]}
      >
        <Input
          className={globalStyles.field}
          placeholder="Enter Model Identification"
          disabled={model === 'default'}
        />
      </Item>

      <Item
        label="Profile"
        name="profileId"
        rules={[
          {
            required: true,
            message: 'Please select Access Point Profile',
          },
        ]}
      >
        <Select className={globalStyles.field} placeholder="Select Access Point Profile">
          {Object.keys(profiles).map(i => (
            <Option key={profiles[i].id} value={profiles[i].id}>
              {profiles[i].name}
            </Option>
          ))}
        </Select>
      </Item>
    </Form>
  );

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onSubmit(values);
      })
      .catch(() => {});
  };

  const returnContent = () => {
    if (loadingProfile) return <Spin className={styles.spinner} size="large" />;
    if (errorProfile)
      return <Alert message="Error" description="Failed to load profiles." type="error" showIcon />;
    return content;
  };

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      onSuccess={handleOnSuccess}
      title={title}
      content={returnContent()}
    />
  );
};

FormModal.propTypes = {
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  model: PropTypes.string,
  profileId: PropTypes.number,
  buttonText: PropTypes.string,
  profiles: PropTypes.instanceOf(Object),
  errorProfile: PropTypes.instanceOf(Object),
  loadingProfile: PropTypes.bool,
  usedModels: PropTypes.instanceOf(Object),
};

FormModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  buttonText: '',
  model: '',
  profileId: null,
  profiles: {},
  errorProfile: null,
  loadingProfile: true,
  usedModels: {},
};

export default FormModal;
