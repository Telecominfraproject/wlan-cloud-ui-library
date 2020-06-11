import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Breadcrumb } from 'antd';

import Modal from 'components/Modal';
import styles from './index.module.scss';

const { Item } = Form;

const AddFormModal = ({ onCancel, onSubmit, visible, title, locationPath }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ location: '' });
  }, [visible]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const breadCrumbs = locationPath.map(location => (
    <Breadcrumb.Item key={location.id}>{location.name}</Breadcrumb.Item>
  ));

  const content = (
    <Form {...layout} form={form}>
      <div className={styles.breadCrumbWrap}>
        {locationPath.length > 0 && (
          <Breadcrumb separator=">">
            {breadCrumbs}
            <Breadcrumb.Item key={0}>New Location</Breadcrumb.Item>
          </Breadcrumb>
        )}
      </div>
      <Item
        label="New Location Name"
        name="location"
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

AddFormModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  locationPath: PropTypes.instanceOf(Array),
};

AddFormModal.defaultProps = {
  title: '',
  locationPath: [],
};

export default AddFormModal;
