import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Alert, Spin } from 'antd';

import Modal from 'components/Modal';
import ModalSelect from 'components/ModalSelect';
import { modalLayout } from 'utils/form';
import styles from 'styles/index.scss';

const { Item } = Form;
const { Option } = Select;

const AddApModal = ({
  onCancel,
  onSubmit,
  visible,
  buttonText,
  title,
  profiles,
  loadingProfile,
  errorProfile,
  onFetchMoreProfiles,
}) => {
  const [form] = Form.useForm();

  const content = (
    <Form {...modalLayout} form={form}>
      <Item
        label="Asset ID"
        name="inventoryId"
        rules={[
          {
            required: true,
            message: 'Please enter Asset Identification',
          },
        ]}
      >
        <Input className={styles.field} placeholder="Enter Asset Identification" />
      </Item>

      <Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter Access Point name',
          },
        ]}
      >
        <Input className={styles.field} placeholder="Enter Access Point name" />
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
        <ModalSelect
          className={styles.field}
          placeholder="Select Access Point Profile"
          onPopupScroll={onFetchMoreProfiles}
          listItemHeight={10}
        >
          {Object.keys(profiles).map(i => (
            <Option key={profiles[i].id} value={profiles[i].id}>
              {profiles[i].name}
            </Option>
          ))}
        </ModalSelect>
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
      buttonText={buttonText}
    />
  );
};

AddApModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  profiles: PropTypes.instanceOf(Object),
  errorProfile: PropTypes.instanceOf(Object),
  loadingProfile: PropTypes.bool.isRequired,
  onFetchMoreProfiles: PropTypes.func,
};

AddApModal.defaultProps = {
  title: '',
  buttonText: '',
  profiles: {},
  errorProfile: {},
  onFetchMoreProfiles: () => {},
};

export default AddApModal;
