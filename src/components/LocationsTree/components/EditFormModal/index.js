import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';

const { Item } = Form;

const EditFormModal = ({ onCancel, onSubmit, visible, title, selectedLocation }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (selectedLocation) {
      const { name } = selectedLocation;
      form.setFieldsValue({ name });
    }
  }, [visible, selectedLocation]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const content = (
    <Form {...layout} form={form}>
      <Item
        label="Location Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter location name',
          },
        ]}
      >
        <Input className={styles.field} />
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
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  selectedLocation: PropTypes.shape({
    id: PropTypes.string,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.string,
  }),
};

EditFormModal.defaultProps = {
  title: '',
  selectedLocation: {},
};

export default EditFormModal;
