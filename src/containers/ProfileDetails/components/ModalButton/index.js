import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Tooltip, Select, Input, Card, Modal as AntdModal } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import Withroles from 'components/WithRoles';

import { pageLayout } from 'utils/form';
import { handleOnProfileUpdate, handleOnCreateProfile, PROFILE_TYPES } from 'utils/profiles';

import styles from './index.module.scss';

const { Item } = Form;

const ModalButton = ({
  setActiveProfile,
  activeProfile,
  profileType,
  onSubmit,
  title,
  content: Content,
  contentProps,
  icon,
  tooltipTitle,
  form,
  name,
  handleOnFormChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const [modalForm] = Form.useForm();

  const handleOnModalFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const handleOnSubmit = () => {
    modalForm
      .validateFields()
      .then(async values => {
        const profile =
          title === 'Add Profile'
            ? await handleOnCreateProfile(profileType, values, onSubmit)
            : await handleOnProfileUpdate(
                profileType,
                activeProfile?.details,
                values,
                onSubmit,
                activeProfile
              );

        setActiveProfile(profile);

        if (profile.name !== activeProfile?.name && name) {
          form.setFieldsValue({
            [name]: {
              label: profile.name,
              value: profile.id,
            },
          });
        }
        if (profile.id !== activeProfile?.id) {
          handleOnFormChange();
        }

        modalForm.resetFields();
        setVisible(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    modalForm.setFieldsValue({
      name: title === 'Add Profile' ? '' : activeProfile?.name,
    });
  }, [activeProfile, title]);

  const onCancel = () => {
    if (isFormDirty) {
      AntdModal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content:
          'You have unsaved changes. Please confirm closing without saving this wireless profile:',
        okText: 'Close',
        cancelText: 'Cancel',
        onOk: () => {
          setVisible(false);
          AntdModal.destroyAll();
        },
      });
    } else {
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        onCancel={onCancel}
        visible={visible}
        title={title}
        width={1150}
        bodyStyle={{ overflowY: 'scroll', height: '560px' }}
        onSuccess={handleOnSubmit}
        content={
          <Form
            {...pageLayout}
            onValuesChange={handleOnModalFormChange}
            form={modalForm}
            className={styles.FormContainer}
            scrollToFirstError={{ block: 'center' }}
          >
            <>
              <Card>
                <Item label="Type">
                  <Select defaultValue={profileType} disabled>
                    <Select.Option value={profileType}>{PROFILE_TYPES[profileType]}</Select.Option>
                  </Select>
                </Item>
                <Item
                  name="name"
                  label="Profile Name"
                  rules={[{ required: true, message: 'Please input your profile name' }]}
                >
                  <Input placeholder="Enter profile name" />
                </Item>
              </Card>
              <Content form={modalForm} {...activeProfile} {...contentProps} isModalProfile />
            </>
          </Form>
        }
      />
      <Withroles>
        <Tooltip title={tooltipTitle}>
          <Button
            onClick={() => {
              setVisible(true);
              setIsFormDirty(false);
            }}
            disabled={!activeProfile}
            icon={icon}
            title={`${title}-${profileType}`}
          />
        </Tooltip>
      </Withroles>
    </>
  );
};

ModalButton.propTypes = {
  setActiveProfile: PropTypes.func,
  activeProfile: PropTypes.instanceOf(Object),
  profileType: PropTypes.string,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.func.isRequired,
  contentProps: PropTypes.instanceOf(Object),
  icon: PropTypes.node,
  tooltipTitle: PropTypes.string,
  form: PropTypes.instanceOf(Object),
  name: PropTypes.string,
  handleOnFormChange: PropTypes.func,
};

ModalButton.defaultProps = {
  setActiveProfile: () => {},
  activeProfile: {},
  profileType: '',
  onSubmit: () => {},
  title: 'Add Profile',
  contentProps: [],
  icon: <PlusOutlined />,
  tooltipTitle: 'Add Profile',
  form: {},
  name: '',
  handleOnFormChange: () => {},
};

export default ModalButton;
