import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import Modal from 'components/Modal';
import styles from './index.module.scss';

const { Item } = Form;

const FormModal = ({ onCancel, onSubmit, visible, title, singleLocationData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (singleLocationData) {
      const { name, locationType } = singleLocationData;
      form.setFieldsValue({ name, locationType });
    }
  }, [visible, singleLocationData]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const content = (
    <Form {...layout} form={form}>
      <Item
        label="Location Name:"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter location name',
          },
          {
            type: 'string',
            message: 'The input is not valid locaiton name',
          },
        ]}
      >
        <Input className={styles.Field} />
      </Item>
      <Item
        label="Location Type:"
        name="locationType"
        rules={[
          {
            required: true,
            message: 'Please enter location type',
          },
          {
            type: 'string',
            message: 'The input is not valid locaiton type',
          },
        ]}
      >
        <Input className={styles.Field} />
      </Item>
      <Item
        label="Country Code:"
        name="countryCode"
        rules={[
          {
            required: true,
            message: 'Please enter country code',
          },
          {
            type: 'string',
            message: 'The input is not valid country code',
          },
        ]}
      >
        <Input className={styles.Field} />
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

FormModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  singleLocationData: PropTypes.shape({
    id: PropTypes.number,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.number,
  }),
};

FormModal.defaultProps = {
  title: '',
  singleLocationData: {},
};

export default FormModal;
