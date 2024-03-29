import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, DatePicker } from 'antd';

import Modal from 'components/Modal';
import { modalLayout } from 'utils/form';

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
  isEdit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && isEdit) {
      form.resetFields();
      form.setFieldsValue({
        modelId,
        versionName,
        description,
        commit,
        filename,
        date: parseInt(releaseDate, 10) ? moment(parseInt(releaseDate, 10)) : null,
      });
    }
  }, [visible]);

  const content = (
    <Form {...modalLayout} form={form}>
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
        <Input disabled={modelId} />
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
        <Input />
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
        <Input />
      </Item>

      <Item label="Commit" name="commit">
        <Input />
      </Item>

      <Item label="Release Date" name="date">
        <DatePicker data-testid="datePicker" showTime />
      </Item>
      <Item label="Description" name="description">
        <Input.TextArea rows={3} />
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
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  modelId: PropTypes.string,
  versionName: PropTypes.string,
  description: PropTypes.string,
  commit: PropTypes.string,
  releaseDate: PropTypes.string,
  filename: PropTypes.string,
  isEdit: PropTypes.bool,
};

VersionModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  modelId: '',
  versionName: '',
  description: '',
  commit: '',
  releaseDate: null,
  filename: '',
  isEdit: false,
};

export default VersionModal;
