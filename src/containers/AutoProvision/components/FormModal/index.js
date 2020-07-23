import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Alert, Spin } from 'antd';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';

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
}) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

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
        ]}
      >
        <Input className={styles.field} placeholder="Enter Model Identification" />
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
        <Select className={styles.field} placeholder="Select Access Point Profile">
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
    if (loadingProfile) return <Spin size="large" />;
    if (Object.keys(errorProfile).length > 0)
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
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  profiles: PropTypes.instanceOf(Object),
  errorProfile: PropTypes.instanceOf(Object),
  loadingProfile: PropTypes.bool.isRequired,
};

FormModal.defaultProps = {
  title: '',
  buttonText: '',
  profiles: {},
  errorProfile: {},
};

export default FormModal;
