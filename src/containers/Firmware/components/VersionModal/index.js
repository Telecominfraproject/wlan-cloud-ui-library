import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, DatePicker } from 'antd';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';

const { Item } = Form;

const VersionModal = ({
  onCancel,
  onSubmit,
  visible,
  title,
  modelId,
  versionName,
  description,
  commit,
  releaseDate,
  filename,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ modelId, versionName, description, commit, filename });
  }, [visible]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const date = new Date(parseInt(releaseDate, 10));

  const content = (
    <Form {...layout} form={form}>
      <Item
        label="Model ID"
        name="modelId"
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
        name="versionName"
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
        name="filename"
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

      <Item label="Release Date" name="releaseDate" initialValue={moment(date)}>
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
  modelId: PropTypes.number,
  versionName: PropTypes.string,
  description: PropTypes.string,
  commit: PropTypes.string,
  releaseDate: PropTypes.number,
  filename: PropTypes.string,
};

VersionModal.defaultProps = {
  title: '',
  modelId: 0,
  versionName: '',
  description: '',
  commit: '',
  releaseDate: 0,
  filename: '',
};

export default VersionModal;
