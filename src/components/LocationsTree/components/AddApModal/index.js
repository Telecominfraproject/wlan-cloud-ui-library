import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Alert, Spin } from 'antd';

import Modal from 'components/Modal';
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
  isLastProfilesPage,
}) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const handleOnPopupScroll = e => {
    if (isLastProfilesPage) {
      return false;
    }
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      onFetchMoreProfiles();
    }
    return true;
  };

  const content = (
    <Form {...layout} form={form}>
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
        <Select
          className={styles.field}
          placeholder="Select Access Point Profile"
          onPopupScroll={handleOnPopupScroll}
          listItemHeight={10}
        >
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
  isLastProfilesPage: PropTypes.bool,
};

AddApModal.defaultProps = {
  title: '',
  buttonText: '',
  profiles: {},
  errorProfile: {},
  onFetchMoreProfiles: () => {},
  isLastProfilesPage: true,
};

export default AddApModal;
