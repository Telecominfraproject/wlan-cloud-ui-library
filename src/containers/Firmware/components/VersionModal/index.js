import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker } from 'antd';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';

const { Item } = Form;

const VersionModal = ({ onCancel, onSubmit, visible, title }) => {
  const [form] = Form.useForm();

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
        label="Version Name"
        name="version"
        rules={[
          {
            required: true,
            message: 'Please input your Version Name',
          },
        ]}
      >
        <Input className={styles.field} />
      </Item>
      <Item
        label="Firmware URL"
        name="url"
        rules={[
          {
            required: true,
            message: 'Please input your Firmware URL',
          },
        ]}
      >
        <Input className={styles.field} />
      </Item>
      <Item label="Validation Code (MD5)" name="validation">
        <Input className={styles.field} />
      </Item>
      <Item label="Commit" name="commit">
        <Input className={styles.field} />
      </Item>

      <Item label="Release Date" name="releaseDate">
        <DatePicker showTime />
      </Item>
      <Item label="Description" name="description">
        <Input.TextArea rows={3} className={styles.field} />
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
};

VersionModal.defaultProps = {
  title: '',
};

export default VersionModal;
