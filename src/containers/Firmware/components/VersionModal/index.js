import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';

const { Item } = Form;
const { Option } = Select;

const VersionModal = ({ onCancel, onSubmit, visible, title, firmware, model, firmwareData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ model, firmware });
  }, [visible]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const content = (
    <Form {...layout} form={form}>
      <Item
        label="Model ID"
        name="model"
        rules={[
          {
            required: true,
            message: 'Please input your Model ID',
          },
        ]}
      >
        <Input className={styles.field} />
      </Item>

      <Item
        label="Firmware Version"
        name="version"
        rules={[
          {
            required: true,
            message: 'Please select your firmware version',
          },
        ]}
      >
        <Select className={styles.field} placeholder="Select Firmware Version">
          {Object.keys(firmwareData).map(i => (
            <Option key={firmwareData[i].id} value={firmwareData[i].id}>
              {firmwareData[i].name}
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

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      onSuccess={handleOnSuccess}
      title={title}
      content={content}
    />
  );
};

VersionModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  firmware: PropTypes.string,
  model: PropTypes.string,
  firmwareData: PropTypes.instanceOf(Object),
};

VersionModal.defaultProps = {
  title: '',
  firmware: '',
  model: '',
  firmwareData: {},
};

export default VersionModal;
