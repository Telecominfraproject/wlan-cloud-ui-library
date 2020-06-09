import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import Modal from 'components/Modal';
import styles from './index.module.scss';

const { Item } = Form;
const { Option } = Select;

const EditFormModal = ({ onCancel, onSubmit, visible, title, selectedLocation }) => {
  const [form] = Form.useForm();
  const [selectedLocationType, setLocationType] = useState('');

  useEffect(() => {
    form.resetFields();
    if (selectedLocation) {
      const { name, locationType } = selectedLocation;
      form.setFieldsValue({ name, locationType });
      setLocationType(locationType);
    }
  }, [visible, selectedLocation]);

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
        ]}
      >
        <Input className={styles.Field} />
      </Item>
      <Item label="Location Type:" name="locationType">
        <Select defaultValue={selectedLocationType}>
          <Option value="COUNTRY">COUNTRY</Option>
          <Option value="SITE">SITE</Option>
          <Option value="BUILDING">BUILDING</Option>
          <Option value="FLOOR">FLOOR</Option>
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

EditFormModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  selectedLocation: PropTypes.shape({
    id: PropTypes.number,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.number,
  }),
};

EditFormModal.defaultProps = {
  title: '',
  selectedLocation: {},
};

export default EditFormModal;
