import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Alert, Spin } from 'antd';

import Modal from 'components/Modal';
import ContainedSelect from 'components/ContainedSelect';
import { modalLayout } from 'utils/form';
import styles from '../../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const FormModal = ({
  onCancel,
  onSubmit,
  visible,
  title,
  profiles,
  loadingProfile,
  errorProfile,
  model,
  profileId,
  usedModels,
  onFetchMoreProfiles,
}) => {
  const [form] = Form.useForm();

  const filteredModels = useMemo(() => {
    return usedModels.filter(value => value !== model);
  }, [model, usedModels]);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        model,
        profileId: profileId ? profileId.toString() : null,
      });
    }
  }, [visible]);

  const content = (
    <Form {...modalLayout} form={form}>
      <Item
        label="Model"
        name="model"
        rules={[
          {
            required: true,
            message: 'Please enter Model.',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || filteredModels.indexOf(getFieldValue('model')) === -1) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Model already used. Please enter a new model.'));
            },
          }),
        ]}
      >
        <Input placeholder="Enter Model" disabled={model === 'default'} />
      </Item>

      <Item
        label="Profile"
        name="profileId"
        rules={[
          {
            required: true,
            message: 'Please select Access Point Profile.',
          },
        ]}
      >
        <ContainedSelect
          placeholder="Select Access Point Profile"
          onPopupScroll={e => onFetchMoreProfiles(e)}
        >
          {profiles.map(i => (
            <Option key={i.id} value={i.id}>
              {i.name}
            </Option>
          ))}
        </ContainedSelect>
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
    if (loadingProfile)
      return <Spin className={styles.spinner} data-testid="loadingProfile" size="large" />;
    if (errorProfile)
      return (
        <Alert
          data-testid="errorProfile"
          message="Error"
          description="Failed to load profiles."
          type="error"
          showIcon
        />
      );
    return content;
  };

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      onSuccess={handleOnSuccess}
      title={title}
      content={returnContent()}
    />
  );
};

FormModal.propTypes = {
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  model: PropTypes.string,
  profileId: PropTypes.number,
  profiles: PropTypes.instanceOf(Array),
  errorProfile: PropTypes.instanceOf(Object),
  loadingProfile: PropTypes.bool,
  usedModels: PropTypes.instanceOf(Array),
  onFetchMoreProfiles: PropTypes.func,
};

FormModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  model: '',
  profileId: null,
  profiles: [],
  errorProfile: null,
  loadingProfile: true,
  usedModels: [],
  onFetchMoreProfiles: () => {},
};

export default FormModal;
